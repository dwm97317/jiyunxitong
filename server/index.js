/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import Database from 'better-sqlite3';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3001;
const db = new Database(':memory:'); // Using memory for demo, could be a file

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Database with Mock Data
db.exec(`
  CREATE TABLE IF NOT EXISTS plaza_items (
    id TEXT PRIMARY KEY,
    orderNo TEXT,
    date TEXT,
    name TEXT,
    type TEXT,
    location TEXT,
    zip TEXT,
    weight TEXT,
    total TEXT,
    transport TEXT,
    avatar TEXT,
    logo TEXT,
    isOfficial INTEGER
  );

  CREATE TABLE IF NOT EXISTS claims (
    id TEXT PRIMARY KEY,
    trackingNo TEXT,
    intlNo TEXT,
    cargoInfo TEXT,
    status TEXT,
    itemInfo TEXT,
    insurance TEXT,
    time TEXT,
    type TEXT
  );
`);

// Seed data
const insertPlaza = db.prepare('INSERT INTO plaza_items (id, orderNo, date, name, type, location, zip, weight, total, transport, avatar, isOfficial) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
insertPlaza.run('1', '1234567890', '05/29', '团长昵称', '普货', 'West Covina,California US', '91790', '25kg', '120kg', 'air', 'https://api.dicebear.com/7.x/avataaars/svg?seed=Aneka', 0);
insertPlaza.run('2', '1234567891', '05/30', '新泽西网点', '普货', 'New Jersey, US', '07001', '50kg', '200kg', 'sea', 'https://api.dicebear.com/7.x/initials/svg?seed=NJ', 1);

// Routes
app.get('/api/plaza', (req, res) => {
    const items = db.prepare('SELECT * FROM plaza_items').all();
    res.json(items.map(item => ({ ...item, isOfficial: !!item.isOfficial })));
});

app.get('/api/claims', (req, res) => {
    const items = db.prepare('SELECT * FROM claims').all();
    res.json(items);
});

app.post('/api/predeclare', (req, res) => {
    console.log('Predeclare received:', req.body);
    res.status(201).json({ success: true, id: Math.random().toString(36).substr(2, 9) });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
