const db = require('../helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await db.Department.findAll();
}

async function getById(id) {
    return await db.Department.findByPk(id);
}

async function create(params) {
    // Validate
    if (await db.Department.findOne({ where: { name: params.name } })) {
        throw 'Department with this name already exists';
    }

    // Create department
    const department = await db.Department.create(params);
    return department;
}

async function update(id, params) {
    const department = await db.Department.findByPk(id);

    // Validate
    if (!department) throw 'Department not found';
    if (params.name && params.name !== department.name && 
        await db.Department.findOne({ where: { name: params.name } })) {
        throw 'Department name is already taken';
    }

    // Update and save
    Object.assign(department, params);
    await department.save();
    
    return department;
}

async function _delete(id) {
    const department = await db.Department.findByPk(id);
    if (!department) throw 'Department not found';
    
    // Check if department has employees
    const employeeCount = await db.Employee.count({ where: { departmentId: id } });
    if (employeeCount > 0) {
        throw 'Cannot delete department with employees. Reassign employees first.';
    }
    
    await department.destroy();
}