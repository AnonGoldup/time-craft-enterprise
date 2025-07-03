// Utility functions to transform data between different casing conventions

export function normalizeEmployee(employee: any) {
  if (!employee) return employee;
  
  return {
    ...employee,
    employeeID: employee.EmployeeID || employee.employeeID,
    fullName: employee.FullName || employee.fullName,
    department: employee.Department || employee.department,
    class: employee.Class || employee.class,
    firstName: employee.firstName || employee.FullName?.split(' ')[0] || '',
    lastName: employee.lastName || employee.FullName?.split(' ').slice(1).join(' ') || ''
  };
}

export function normalizeProject(project: any) {
  if (!project) return project;
  
  return {
    ...project,
    projectID: project.ProjectID || project.projectID,
    projectCode: project.ProjectCode || project.projectCode,
    projectDescription: project.ProjectDescription || project.projectDescription
  };
}

export function normalizeCostCode(costCode: any) {
  if (!costCode) return costCode;
  
  return {
    ...costCode,
    costCodeID: costCode.CostCodeID || costCode.costCodeID,
    costCode: costCode.CostCode || costCode.costCode,
    description: costCode.Description || costCode.description
  };
}

export function normalizeProjectExtra(extra: any) {
  if (!extra) return extra;
  
  return {
    ...extra,
    extraID: extra.ExtraID || extra.extraID,
    extraValue: extra.ExtraValue || extra.extraValue,
    description: extra.Description || extra.description
  };
}