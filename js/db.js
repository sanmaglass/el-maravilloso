// Database Configuration using Dexie.js (Global Scope)

const db = new Dexie('WorkMasterDB');

// Version 5: Add expiryDate and stock to products
db.version(5).stores({
    employees: '++id, name, email, role, hourlyRate, dailyRate',
    workLogs: '++id, employeeId, date, status',
    settings: 'key',
    products: '++id, name, category, buyPrice, salePrice, expiryDate, stock',
    promotions: '++id, title, text, isActive'
});

async function seedDatabase() {
    const count = await db.employees.count();
    if (count === 0) {
        console.log("Seeding database...");
        await db.employees.add({
            name: "Demo Employee",
            email: "demo@example.com",
            role: "Developer",
            hourlyRate: 5000,
            dailyRate: 40000,
            avatar: "DE",
            startDate: new Date().toISOString()
        });
    }
}

// Expose to window
window.db = db;
window.seedDatabase = seedDatabase;
