module.exports = {
  hostname: process.argv[2] || process.env.HOSTNAME || '127.0.0.1',
  port: process.argv[3] || process.env.PORT || 3000,
  JWT_SECRET: process.env.JWT_SECRET,
  smtpEmail: process.env.MAILER_EMAIL,
  smtpEmailPass: process.env.MAILER_PASSWORD,
  arrKeys: ['login', 'dates', 'password', 'firstName', 'lastName', 'position', 'email', 'phone', 'type', 'manager', 'teamlead', 'department', 'hr', 'roles'],
  arrKeysIssues: ['name', 'excerpt', 'author', 'content', 'assignTo', 'reassigned', '', 'statustatusNamesValue', 'typeName', 'typeValue'],
  arrKeysDepartments: ['firstName', 'lastName', 'position', 'email', 'phone', 'contacts'],
  frontURI: process.env.FRONT_URI,
  userQueryOptions: ['type', 'roles', 'hr'],
};
