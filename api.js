const express = require('express')
const app = express()
const port = 3003
const bodyParser = require('body-parser')
const db = require("./connection")
const respon = require("./response")

app.use(bodyParser.json())
app.use(express.json())

// memunculkan data berupa tabel bisa memakai get
app.get('/', (req, res) => {
    res.send("okeee")
})

app.get('/mahasiswa', (req, res) => {
    db.query("SELECT * FROM mahasiswa", (error,result) => {
        respon(200, result, "get all data from mahasiswa", res)
    if (error) {
        console.log('Error inserting data:', err);
        return res.status(500).json({ error: 'Database error', details: err.message });
        }
})
})

// untuk memposting data sesuai kehendak user mungkin?
app.post('/mahasiswa', (req, res) => { // ini menggunakan postman
    const { nim, nama_lengkap, kelas } = req.body;
    const query = 'INSERT INTO mahasiswa (nim, nama_lengkap, kelas) VALUES (?, ?, ?)';
    db.query(query, [nim, nama_lengkap, kelas], (error, result) => {
        respon(200, result, "posting berhasil", res)
    if (error) {
        console.log('Error inserting data:', err);
        return res.status(500).json({ error: 'Database error', details: err.message });
        }
    });
});

// untuk merubah data yang ada di database
app.put('/mahasiswa/:id', (req, res) => {
    const id = req.params.id;
    const { nim, nama_lengkap, kelas } = req.body;
    const query = 'UPDATE mahasiswa SET nim = ?, nama_lengkap = ?, kelas = ? WHERE id = ?';
    db.query(query, [nim, nama_lengkap, kelas, id], (error, result) => {
        respon(200, result, "update data from mahasiswa", res)
        if (error) {
            console.error('Error updating data:', error);
            return res.status(500).json({ error: 'Database error', details: error.message });
        }
    });
})

app.delete('/mahasiswa/:id', (req, res) => {
    const query = 'DELETE FROM mahasiswa WHERE id = ?';
    db.query(query, [req.params.id], (error, result) => {
        respon(200, result, "deleted data from mahasiswa", res)
    if (error) {
        console.error('Error deleted data:', err);
        return res.status(500).json({ error: 'Database error', details: err.message });
        }
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
