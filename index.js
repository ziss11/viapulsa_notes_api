const { PrismaClient } = require('@prisma/client');
const express = require('express');
const app = express();
const port = 3000;

const prisma = new PrismaClient();

app.use(express.json());

app.get('/notes', async (req, res) => {
    const notes = await prisma.notes.findMany();
    res.status(200).json({
        status: 'success',
        data: notes,
    });
});

app.post('/notes', async (req, res) => {
    const note = await prisma.notes.create({
        data: req.body,
    });
    res.status(201).json({
        status: 'success',
        message: 'Catatan berhasil ditambahkan',
        data: note,
    });
});

app.patch('/notes/:id', async (req, res) => {
    const { id } = req.params;
    const note = await prisma.notes.update({
        where: { id },
        data: req.body,
    });
    res.status(200).json({
        status: 'success',
        message: 'Catatan berhasil diubah',
        data: note,
    });
});

app.delete('/notes/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.notes.delete({
        where: { id },
    });
    res.status(200).json({
        status: 'success',
        message: 'Catatan berhasil dihapus',
    });
});

app.listen(port);
