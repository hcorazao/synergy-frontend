export const WORKFORCE_REPORTS = [
  {
    name: 'Contact Info Report',
    tooltip: `employeeId, firstName, lastName, actualClient, actualCampaign, celNumber,
    telNumber, email, address, town, district, position, hireDate`,
    projection: 'contact',
    options: [
      {
        $unwind: {
          path: '$position',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          position: '$position.name',
        },
      },
    ],
  },
  {
    name: 'Leave Report',
    tooltip: `employeeId, firstName, lastName, actualClient, actualCampaign, excuseTimeFrom, excuseTimeTo, reason, description, isSupported, isCertified, position, hireDate`,
    projection: 'leaves',
    options: [
      {
        $unwind: {
          path: '$position',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          position: '$position.name',
        },
      },
    ],
    extras: [],
    extraFilters: [],
  },
  {
    name: 'Leads Report',
    tooltip: `
    employeeId,
    firstName,
    lastName,
    actualClient,
    actualCampaign,
    manager,
    shiftManager,
    supervisor,
    trainer, position, hireDate
    `,
    projection: 'leads',
    options: [
      {
        $unwind: {
          path: '$position',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          position: '$position.name',
        },
      },
    ],
  },
  {
    name: 'Hire Report',
    tooltip: `
     employeeId,
    firstName,
    lastName,
    actualClient,
    actualCampaign,
    position,
    hireDate
    `,
    projection: 'hire',
    options: [
      {
        $unwind: {
          path: '$position',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          position: '$position.name',
        },
      },
    ],
  },
  {
    name: 'Emergency Contact Report',
    tooltip: ` employeeId, firstName, lastName, actualClient, actualCampaign,
              celNumber, telNumber, email, address, town, district, family, position, hireDate
              `,
    projection: 'emergency',
    options: [

    ],
  },
  {
    name: 'Weekly Shift Report',
    tooltip: `
     employeeId,
    firstName,
    lastName,
    actualClient,
    actualCampaign,
    celNumber,
    telNumber,
    email,
    address,
    town,
    district,
    restriction,
    position, hireDate
    shift
    `,
    projection: 'shift',
    options: [],
  },
  {
    name: 'Hours Existence Report',
    tooltip: `
     employeeId,
    firstName,
    lastName,
    actualClient,
    actualCampaign,
    position, hireDate
    last-15-days-hours
    `,
    projection: 'hours',
    options: [],
  },
];
export const OPERATIONS_REPORTS = [
  {
    name: 'Latest Position Report',
    tooltip: `
    employeeId,
    firstName,
    lastName,
    actualClient,
    actualCampaign,
    manager,
    shiftManager,
    supervisor,
    trainer,
    billable,
    position,
    hireDate,
    `,
    projection: 'position',
    options: [
      {
        $unwind: {
          path: '$position',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          position: '$position.name',
          department: '$position.department',
          positionClient: '$position.client',
          positionCampaign: '$position.campaign',
          positionId: '$position.positionId',
          startDate: { $dateToString: { date: '$position.startDate', format: '%m/%d/%Y' } },
          endDate: { $dateToString: { date: '$position.endDate', format: '%m/%d/%Y' } },
        },
      },
    ],
  },
];
export const HR_REPORTS = [
  {
    name: 'Attrition Report',
    tooltip: `
     employeeId,
    firstName,
    lastName,
    actualClient,
    actualCampaign,
    terminationDate
    `,
    projection: 'attrition',
    options: [
      {
        $unwind: {
          path: '$position',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$attrition',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          position: '$position.name',
          reason1: '$attrition.reason1',
          reason2: '$attrition.reason2',
          comment: '$attrition.comment',
          submittedBy: { $concat: ['$attrition.submittedBy.firstName', ' ', '$attrition.submittedBy.lastName'] },
          commentDate: { $dateToString: { date: '$attrition.commentDate', format: '%m/%d/%Y' } },
        },
      },
    ],
  },
];
export const PAYROLL_REPORTS = [
  {
    name: 'Termination Report',
    tooltip: `
     employeeId,
    firstName,
    middleName,
    lastName,
    emailAddress,
    actualClient,
    actualCampaign,
    hireDate,
    socialSecurity,
    attritionReason,
    bankAccount,
    hourlyRate,
    terminationDate,
    last 3 positions,
    `,
    projection: 'payrollTermination',
    options: [
      {
        $unwind: {
          path: '$currentPosition',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$olderPosition',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$oldestPosition',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$attrition',
          preserveNullAndEmptyArrays: true,
        },
      },
      {$project: {
          employeeId: 1,
          firstName: 1,
          lastName: 1,
          socialSecurity: 1,
          status: 1,
          actualClient: 1,
          actualCampaign: 1,
          hireDate: 1,
          bankAccount: 1,
          baseWage: '$currentPosition.baseWage',
          hourlyRate: {$divide:  [{$divide: [{$multiply: ['$currentPosition.baseWage', 12]}, 52]}, 45]},
          currentPosition: '$currentPosition.name',
          olderPosition: '$olderPosition.name',
          oldestPosition: '$oldestPosition.name',
          terminationDate: 1,
          attrition_reason1: '$attrition.reason1',
          attrition_reason2: '$attrition.reason2',
          attrition_comment: '$attrition.comment',
          attrition_submittedBy: {
            $concat: ['$attrition.submittedBy.firstName', ' ', '$attrition.submittedBy.lastName'],
          },
        }}
    ],
  },
  {
    name: 'New Hires Report',
    tooltip: `
     employeeId,
    firstName,
    middleName,
    lastName,
    emailAddress,
    actualClient,
    actualCampaign,
    hireDate,
    socialSecurity,
    attritionReason,
    bankAccount,
    hourlyRate,
    terminationDate,
    `,
    projection: 'payrollHires',
    options: [
      {
        $unwind: {
          path: '$position',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $unwind: {
          path: '$attrition',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $addFields: {
          position: '$position.name',
          baseWage: '$position.baseWage',
          attrition_reason: '$attrition.reason1',
          attrition_comment: '$attrition.comment',
          attrition_submittedBy: {
            $concat: ['$attrition.submittedBy.firstName', ' ', '$attrition.submittedBy.lastName'],
          },
          attrition_commentDate: { $dateToString: { date: '$attrition.commentDate', format: '%m/%d/%Y' } },
        },
      },
    ],
  },
  {
    name: 'Billing Report',
    tooltip: `
     employeeId,
    firstName,
    lastName,
    actualClient,
    actualCampaign,
    billable,
    systemHours,
    tosHours,
    trainingHours,
    breakAndLunchHours,
    scheduledHours,
    `,
    projection: 'billing',
    options: [],
  },
];
export const PROJECTIONS = {
  contact: {
    _id: 0,
    employeeId: 1,
    status: 1,
    firstName: 1,
    lastName: 1,
    actualClient: '$company.client',
    actualCampaign: '$company.campaign',
    celNumber: '$personal.celNumber',
    telNumber: '$personal.telNumber',
    email: '$personal.emailAddress',
    address: '$personal.address',
    town: '$personal.town',
    district: '$personal.district',
    position: { $arrayElemAt: ['$position', 0] },
    hireDate: { $dateToString: { date: '$company.hireDate', format: '%m/%d/%Y' } },
  },
  leaves: {
    _id: 0,
    employeeId: 1,
    status: 1,
    firstName: 1,
    lastName: 1,
    actualClient: '$company.client',
    actualCampaign: '$company.campaign',
    generation: { $concat: ['GEN ', { $toString: '$company.trainingGroupNum' }]},
    position: { $arrayElemAt: ['$position', 0] },
    hireDate: { $dateToString: { date: '$company.hireDate', format: '%m/%d/%Y' } },
    leaves: 1,
  },
  emergency: {
    _id: 0,
    employeeId: 1,
    status: 1,
    firstName: 1,
    lastName: 1,
    actualClient: '$company.client',
    actualCampaign: '$company.campaign',
    position: { $arrayElemAt: ['$position', 0] },
    hireDate: { $dateToString: { date: '$company.hireDate', format: '%m/%d/%Y' } },
    celNumber: '$personal.celNumber',
    telNumber: '$personal.telNumber',
    email: '$personal.emailAddress',
    address: '$personal.address',
    town: '$personal.town',
    district: '$personal.district',
    family: 1,
  },
  shift: {
    _id: 0,
    employeeId: 1,
    status: 1,
    firstName: 1,
    lastName: 1,
    actualClient: '$company.client',
    actualCampaign: '$company.campaign',
    celNumber: '$personal.celNumber',
    telNumber: '$personal.telNumber',
    email: '$personal.emailAddress',
    address: '$personal.address',
    town: '$personal.town',
    district: '$personal.district',
    restriction: '$personal.restriction',
    generation: { $concat: ['GEN ', { $toString: '$company.trainingGroupNum' }]},
    position: { $arrayElemAt: ['$position', 0] },
    hireDate: { $dateToString: { date: '$company.hireDate', format: '%m/%d/%Y' } },
    shift: 1,
  },
  hours: {
    _id: 0,
    employeeId: 1,
    status: 1,
    firstName: 1,
    lastName: 1,
    actualClient: '$company.client',
    actualCampaign: '$company.campaign',
    billable: '$payroll.billable',
    generation: { $concat: ['GEN ', { $toString: '$company.trainingGroupNum' }]},
    position: { $arrayElemAt: ['$position', 0] },
    hireDate: { $dateToString: { date: '$company.hireDate', format: '%m/%d/%Y' } },
    hours: 1,
  },
  position: {
    _id: 0,
    employeeId: 1,
    status: 1,
    firstName: 1,
    lastName: 1,
    actualClient: '$company.client',
    actualCampaign: '$company.campaign',
    manager: '$company.manager.name',
    shiftManager: '$company.shiftManager.name',
    supervisor: '$company.supervisor.name',
    trainer: '$company.trainer.name',
    billable: '$payroll.billable',
    position: { $arrayElemAt: ['$position', 0] },
    hireDate: { $dateToString: { date: '$company.hireDate', format: '%m/%d/%Y' } },
  },
  leads: {
    _id: 0,
    employeeId: 1,
    status: 1,
    firstName: 1,
    lastName: 1,
    actualClient: '$company.client',
    actualCampaign: '$company.campaign',
    manager: '$company.manager.name',
    shiftManager: '$company.shiftManager.name',
    supervisor: '$company.supervisor.name',
    trainer: '$company.trainer.name',
    generation: { $concat: ['GEN ', { $toString: '$company.trainingGroupNum' }]},
    position: { $arrayElemAt: ['$position', 0] },
    hireDate: { $dateToString: { date: '$company.hireDate', format: '%m/%d/%Y' } },
  },
  hire: {
    _id: 0,
    employeeId: 1,
    status: 1,
    firstName: 1,
    lastName: 1,
    actualClient: '$company.client',
    actualCampaign: '$company.campaign',
    generation: { $concat: ['GEN ', { $toString: '$company.trainingGroupNum' }]},
    position: { $arrayElemAt: ['$position', 0] },
    hireDate: { $dateToString: { date: '$company.hireDate', format: '%m/%d/%Y' } },
  },
  attrition: {
    _id: 0,
    employeeId: 1,
    status: 1,
    firstName: 1,
    lastName: 1,
    celNumber: '$personal.celNumber',
    telNumber: '$personal.telNumber',
    email: '$personal.emailAddress',
    socialSecurity: 1,
    manager: '$company.manager.name',
    supervisor: '$company.supervisor.name',
    actualClient: '$company.client',
    actualCampaign: '$company.campaign',
    restriction: '$personal.restriction',
    terminationDate: { $dateToString: { date: '$company.terminationDate', format: '%m/%d/%Y' }},
    generation: { $concat: ['GEN ', { $toString: { $toString: '$company.trainingGroupNum' } }]},
    position: { $arrayElemAt: ['$position', 0]},
    hireDate: { $dateToString: { date: '$company.hireDate', format: '%m/%d/%Y' }},
    attrition: 1,
  },
  billing: {
    _id: 0,
    employeeId: 1,
    status: 1,
    firstName: 1,
    lastName: 1,
    actualClient: '$company.client',
    actualCampaign: '$company.campaign',
    hireDate: { $dateToString: { date: '$company.hireDate', format: '%m/%d/%Y' } },
    billing: 1,
  },
  payrollHires: {
    _id: 0,
    employeeId: 1,
    status: 1,
    firstName: 1,
    lastName: 1,
    actualClient: '$company.client',
    actualCampaign: '$company.campaign',
    hireDate: { $dateToString: { date: '$company.hireDate', format: '%m/%d/%Y' } },
    socialSecurity: 1,
    bankAccount: '$payroll.bankAccount',
    attrition: { $arrayElemAt: ['$attrition', 0] },
    position: { $arrayElemAt: ['$position', 0]},
    baseWage: '',
    terminationDate: { $dateToString: { date: '$company.terminationDate', format: '%m/%d/%Y' } },
  },
  payrollTermination: {
    _id: 0,
    employeeId: 1,
    status: 1,
    firstName: 1,
    lastName: 1,
    actualClient: '$company.client',
    actualCampaign: '$company.campaign',
    hireDate: { $dateToString: { date: '$company.hireDate', format: '%m/%d/%Y' } },
    socialSecurity: 1,
    bankAccount: '$payroll.bankAccount',
    terminationDate: { $dateToString: { date: '$company.terminationDate', format: '%m/%d/%Y' } },
    attrition: { $arrayElemAt: ['$attrition', 0] },
    currentPosition: { $arrayElemAt: ['$position', 0] },
    olderPosition: { $arrayElemAt: ['$position', 1] },
    oldestPosition: { $arrayElemAt: ['$position', 2] },
  },
};
