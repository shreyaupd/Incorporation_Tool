import { pool } from "../db.js";
//creation of company
export const companyRecord = async (req, res) => {
    try {
        const { name, number_of_shareholder, total_capital } = req.body;
        if (!name || number_of_shareholder == null || total_capital == null) {
            return res.status(400).json({ message: "All fields required" });
        }
        const result = await pool.query(`INSERT INTO company (name, number_of_shareholder ,total_capital) VALUES ($1, $2, $3) RETURNING *`, [name, number_of_shareholder, total_capital])
        res.status(201).json({ message: "Company created successfully", result: result.rows })

    } catch (error) {
        res.status(500).json({ error: error.message })
    }

}

export const saveShareholders = async (req, res) => {
    const client = await pool.connect();
    try {
        const { id } = req.params;
        const shareholders = req.body; //here shareholders are array of objects
        if (!Array.isArray(shareholders)) {
            return res.status(400).json({ message: "Shareholders must be an array" })
        }
        const companyCheck = await client.query(
            "SELECT id FROM company WHERE id = $1",
            [id]
        );

        if (companyCheck.rows.length === 0) {
            return res.status(404).json({ message: "Company not found" });
        }
        await client.query("BEGIN")
        for (const sh of shareholders) {
            await client.query(`INSERT INTO shareholder 
                (company_id,first_name,last_name,nationality) VALUES($1,$2,$3,$4)`,
                [id, sh.first_name, sh.last_name, sh.nationality])
        }
        await client.query("COMMIT")
        res.status(201).json({ message: "Shareholders saved successfully" })
    } catch (error) {
        await client.query("ROLLBACK")
        res.status(500).json({ error: error.message })

    } finally {
        client.release()
    }
}

export const getCompanies = async (req, res) => {
    try {
        const result = await pool.query(`
      SELECT 
        c.*,
        COALESCE(
          json_agg(s.*) FILTER (WHERE s.id IS NOT NULL),
          '[]'
        ) AS shareholders
      FROM company c
      LEFT JOIN shareholder s
        ON s.company_id = c.id
      GROUP BY c.id
      ORDER BY c.created_at DESC
    `);

        res.json(result.rows);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export const getCompanyById = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(`
      SELECT 
        c.*,
        COALESCE(
          json_agg(s.*) FILTER (WHERE s.id IS NOT NULL),
          '[]'
        ) AS shareholders
      FROM company c
      LEFT JOIN shareholder s
        ON s.company_id = c.id
      WHERE c.id = $1
      GROUP BY c.id
    `, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Company not found" });
        }

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
