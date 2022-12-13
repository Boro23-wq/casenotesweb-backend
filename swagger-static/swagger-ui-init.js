
window.onload = function() {
  // Build a system
  var url = window.location.search.match(/url=([^&]+)/);
  if (url && url.length > 1) {
    url = decodeURIComponent(url[1]);
  } else {
    url = window.location.origin;
  }
  var options = {
  "swaggerDoc": {
    "openapi": "3.0.0",
    "info": {
      "title": "Case Manager API",
      "description": "The API retrieves information about case managers and their cases.",
      "version": "1.0.0",
      "contact": {}
    },
    "tags": [],
    "servers": [],
    "components": {
      "schemas": {
        "CreateCasemanagerDto": {
          "type": "object",
          "properties": {
            "firstName": {
              "type": "string"
            },
            "lastName": {
              "type": "string"
            },
            "phone": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "profileUrl": {
              "type": "string",
              "nullable": true
            }
          },
          "required": [
            "firstName",
            "lastName",
            "phone",
            "email"
          ]
        },
        "CasemanagerEntity": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number"
            },
            "createdAt": {
              "format": "date-time",
              "type": "string"
            },
            "modifiedAt": {
              "format": "date-time",
              "type": "string"
            },
            "firstName": {
              "type": "string"
            },
            "profileUrl": {
              "type": "string",
              "nullable": true
            },
            "lastName": {
              "type": "string"
            },
            "phone": {
              "type": "string"
            },
            "email": {
              "type": "string"
            }
          },
          "required": [
            "id",
            "createdAt",
            "modifiedAt",
            "firstName",
            "lastName",
            "phone",
            "email"
          ]
        },
        "UpdateCasemanagerDto": {
          "type": "object",
          "properties": {
            "firstName": {
              "type": "string"
            },
            "lastName": {
              "type": "string"
            },
            "phone": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "profileUrl": {
              "type": "string",
              "nullable": true
            }
          }
        },
        "CreateCaseDto": {
          "type": "object",
          "properties": {
            "status": {
              "type": "string"
            },
            "subject": {
              "type": "string"
            },
            "caseManagerEmail": {
              "type": "string"
            },
            "patientEmail": {
              "type": "string"
            },
            "categoryTitle": {
              "type": "string"
            },
            "severityLevel": {
              "type": "string"
            },
            "doctorEmail": {
              "type": "string"
            }
          },
          "required": [
            "status",
            "subject",
            "caseManagerEmail",
            "patientEmail",
            "categoryTitle",
            "severityLevel"
          ]
        },
        "CaseEntity": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number"
            },
            "createdAt": {
              "format": "date-time",
              "type": "string"
            },
            "modifiedAt": {
              "format": "date-time",
              "type": "string"
            },
            "status": {
              "type": "string"
            },
            "subject": {
              "type": "string"
            },
            "caseManagerEmail": {
              "type": "string"
            },
            "categoryTitle": {
              "type": "string"
            },
            "patientEmail": {
              "type": "string"
            },
            "severityLevel": {
              "type": "string"
            },
            "doctorEmail": {
              "type": "string",
              "nullable": true
            }
          },
          "required": [
            "id",
            "createdAt",
            "modifiedAt",
            "status",
            "subject",
            "caseManagerEmail",
            "categoryTitle",
            "patientEmail",
            "severityLevel"
          ]
        },
        "CreateNoteDto": {
          "type": "object",
          "properties": {
            "comment": {
              "type": "string"
            },
            "caseId": {
              "type": "number"
            }
          },
          "required": [
            "comment",
            "caseId"
          ]
        },
        "NoteEntity": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number"
            },
            "createdAt": {
              "format": "date-time",
              "type": "string"
            },
            "modifiedAt": {
              "format": "date-time",
              "type": "string"
            },
            "caseId": {
              "type": "number"
            },
            "comment": {
              "type": "string"
            }
          },
          "required": [
            "id",
            "createdAt",
            "modifiedAt",
            "caseId",
            "comment"
          ]
        },
        "CreateSolutionDto": {
          "type": "object",
          "properties": {
            "subject": {
              "type": "string"
            },
            "investigation": {
              "type": "string"
            },
            "resolution": {
              "type": "string"
            },
            "caseId": {
              "type": "number"
            }
          },
          "required": [
            "subject",
            "investigation",
            "resolution",
            "caseId"
          ]
        },
        "SolutionEntity": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number"
            },
            "createdAt": {
              "format": "date-time",
              "type": "string"
            },
            "modifiedAt": {
              "format": "date-time",
              "type": "string"
            },
            "subject": {
              "type": "string"
            },
            "investigation": {
              "type": "string"
            },
            "resolution": {
              "type": "string"
            },
            "caseId": {
              "type": "number"
            }
          },
          "required": [
            "id",
            "createdAt",
            "modifiedAt",
            "subject",
            "investigation",
            "resolution",
            "caseId"
          ]
        },
        "CreateMilestoneDto": {
          "type": "object",
          "properties": {
            "description": {
              "type": "string"
            },
            "caseId": {
              "type": "number"
            }
          },
          "required": [
            "description",
            "caseId"
          ]
        },
        "MilestoneEntity": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number"
            },
            "createdAt": {
              "format": "date-time",
              "type": "string"
            },
            "modifiedAt": {
              "format": "date-time",
              "type": "string"
            },
            "description": {
              "type": "string"
            },
            "caseId": {
              "type": "number"
            }
          },
          "required": [
            "id",
            "createdAt",
            "modifiedAt",
            "description",
            "caseId"
          ]
        },
        "UpdateCaseDto": {
          "type": "object",
          "properties": {
            "status": {
              "type": "string"
            },
            "subject": {
              "type": "string"
            },
            "caseManagerEmail": {
              "type": "string"
            },
            "patientEmail": {
              "type": "string"
            },
            "categoryTitle": {
              "type": "string"
            },
            "severityLevel": {
              "type": "string"
            },
            "doctorEmail": {
              "type": "string"
            }
          }
        },
        "CreateDoctorDto": {
          "type": "object",
          "properties": {
            "firstName": {
              "type": "string"
            },
            "lastName": {
              "type": "string"
            },
            "phone": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "profession": {
              "type": "string"
            }
          },
          "required": [
            "firstName",
            "lastName",
            "phone",
            "email"
          ]
        },
        "DoctorEntity": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number"
            },
            "createdAt": {
              "format": "date-time",
              "type": "string"
            },
            "modifiedAt": {
              "format": "date-time",
              "type": "string"
            },
            "firstName": {
              "type": "string"
            },
            "lastName": {
              "type": "string"
            },
            "phone": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "profession": {
              "type": "string",
              "nullable": true
            }
          },
          "required": [
            "id",
            "createdAt",
            "modifiedAt",
            "firstName",
            "lastName",
            "phone",
            "email"
          ]
        },
        "UpdateDoctorDto": {
          "type": "object",
          "properties": {
            "firstName": {
              "type": "string"
            },
            "lastName": {
              "type": "string"
            },
            "phone": {
              "type": "string"
            },
            "email": {
              "type": "string"
            },
            "profession": {
              "type": "string"
            }
          }
        },
        "CreatePatientDto": {
          "type": "object",
          "properties": {
            "firstName": {
              "type": "string"
            },
            "lastName": {
              "type": "string"
            },
            "phone": {
              "type": "string"
            },
            "email": {
              "type": "string"
            }
          },
          "required": [
            "firstName",
            "lastName",
            "phone",
            "email"
          ]
        },
        "PatientEntity": {
          "type": "object",
          "properties": {
            "id": {
              "type": "number"
            },
            "createdAt": {
              "format": "date-time",
              "type": "string"
            },
            "modifiedAt": {
              "format": "date-time",
              "type": "string"
            },
            "firstName": {
              "type": "string"
            },
            "lastName": {
              "type": "string"
            },
            "phone": {
              "type": "string"
            },
            "email": {
              "type": "string"
            }
          },
          "required": [
            "id",
            "createdAt",
            "modifiedAt",
            "firstName",
            "lastName",
            "phone",
            "email"
          ]
        },
        "UpdatePatientDto": {
          "type": "object",
          "properties": {
            "firstName": {
              "type": "string"
            },
            "lastName": {
              "type": "string"
            },
            "phone": {
              "type": "string"
            },
            "email": {
              "type": "string"
            }
          }
        },
        "UpdateNoteDto": {
          "type": "object",
          "properties": {
            "comment": {
              "type": "string"
            },
            "caseId": {
              "type": "number"
            }
          }
        },
        "UpdateMilestoneDto": {
          "type": "object",
          "properties": {
            "description": {
              "type": "string"
            },
            "caseId": {
              "type": "number"
            }
          }
        },
        "UpdateSolutionDto": {
          "type": "object",
          "properties": {
            "subject": {
              "type": "string"
            },
            "investigation": {
              "type": "string"
            },
            "resolution": {
              "type": "string"
            },
            "caseId": {
              "type": "number"
            }
          }
        }
      }
    },
    "externalDocs": {
      "description": "Postman Collection",
      "url": "/api-json"
    },
    "paths": {
      "/": {
        "get": {
          "operationId": "AppController_getHello",
          "parameters": [],
          "responses": {
            "200": {
              "description": ""
            }
          }
        }
      },
      "/casemanagers": {
        "post": {
          "operationId": "CasemanagersController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateCasemanagerDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CasemanagerEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "casemanagers"
          ]
        },
        "get": {
          "operationId": "CasemanagersController_findAll",
          "parameters": [
            {
              "name": "skip",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "take",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "email",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/CasemanagerEntity"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "casemanagers"
          ]
        }
      },
      "/casemanagers/{id}/upload": {
        "post": {
          "operationId": "CasemanagersController_uploadFile",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "multipart/form-data": {
                "schema": {
                  "type": "object",
                  "required": [
                    "profile"
                  ],
                  "properties": {
                    "profile": {
                      "type": "string",
                      "format": "binary"
                    }
                  }
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CasemanagerEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "casemanagers"
          ]
        }
      },
      "/casemanagers/{email}/cases": {
        "get": {
          "operationId": "CasemanagersController_findAllCases",
          "parameters": [
            {
              "name": "email",
              "required": true,
              "in": "path",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CasemanagerEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "casemanagers"
          ]
        }
      },
      "/casemanagers/{id}": {
        "get": {
          "operationId": "CasemanagersController_findOne",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CasemanagerEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "casemanagers"
          ]
        },
        "patch": {
          "operationId": "CasemanagersController_update",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateCasemanagerDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CasemanagerEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "casemanagers"
          ]
        },
        "delete": {
          "operationId": "CasemanagersController_remove",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CasemanagerEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "casemanagers"
          ]
        }
      },
      "/cases": {
        "post": {
          "operationId": "CasesController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateCaseDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CaseEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "cases"
          ]
        },
        "get": {
          "operationId": "CasesController_findAll",
          "parameters": [
            {
              "name": "skip",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "take",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/CaseEntity"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "cases"
          ]
        }
      },
      "/cases/{id}/casenotes": {
        "post": {
          "operationId": "CasesController_createNote",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateNoteDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NoteEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "cases"
          ]
        },
        "get": {
          "operationId": "CasesController_findNotes",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NoteEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "cases"
          ]
        }
      },
      "/cases/{id}/solutions": {
        "post": {
          "operationId": "CasesController_createSolution",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateSolutionDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/SolutionEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "cases"
          ]
        },
        "get": {
          "operationId": "CasesController_findSolutions",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/SolutionEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "cases"
          ]
        }
      },
      "/cases/{id}/milestones": {
        "post": {
          "operationId": "CasesController_createMilestone",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateMilestoneDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/MilestoneEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "cases"
          ]
        },
        "get": {
          "operationId": "CasesController_findMilestones",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/MilestoneEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "cases"
          ]
        }
      },
      "/cases/{id}/close": {
        "post": {
          "operationId": "CasesController_closeACase",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/MilestoneEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "cases"
          ]
        }
      },
      "/cases/{id}": {
        "get": {
          "operationId": "CasesController_findOne",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CaseEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "cases"
          ]
        },
        "patch": {
          "operationId": "CasesController_update",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateCaseDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CaseEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "cases"
          ]
        },
        "delete": {
          "operationId": "CasesController_remove",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/CaseEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "cases"
          ]
        }
      },
      "/cases/{id}/casenotes/{noteId}": {
        "get": {
          "operationId": "CasesController_findANote",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "noteId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NoteEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "cases"
          ]
        },
        "delete": {
          "operationId": "CasesController_removeNote",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "noteId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NoteEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "cases"
          ]
        }
      },
      "/cases/{id}/solutions/{solutionId}": {
        "get": {
          "operationId": "CasesController_findASolution",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "solutionId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/SolutionEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "cases"
          ]
        }
      },
      "/cases/{id}/milestones/{milestoneId}": {
        "get": {
          "operationId": "CasesController_findAMilestone",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            },
            {
              "name": "milestoneId",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/MilestoneEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "cases"
          ]
        }
      },
      "/doctors": {
        "post": {
          "operationId": "DoctorsController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreateDoctorDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DoctorEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "doctors"
          ]
        },
        "get": {
          "operationId": "DoctorsController_findAll",
          "parameters": [
            {
              "name": "skip",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "take",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "email",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/DoctorEntity"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "doctors"
          ]
        }
      },
      "/doctors/{id}": {
        "get": {
          "operationId": "DoctorsController_findOne",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DoctorEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "doctors"
          ]
        },
        "patch": {
          "operationId": "DoctorsController_update",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateDoctorDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DoctorEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "doctors"
          ]
        },
        "delete": {
          "operationId": "DoctorsController_remove",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/DoctorEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "doctors"
          ]
        }
      },
      "/patients": {
        "post": {
          "operationId": "PatientsController_create",
          "parameters": [],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CreatePatientDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/PatientEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "patients"
          ]
        },
        "get": {
          "operationId": "PatientsController_findAll",
          "parameters": [
            {
              "name": "skip",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            },
            {
              "name": "take",
              "required": true,
              "in": "query",
              "schema": {
                "type": "string"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/PatientEntity"
                    }
                  }
                }
              }
            }
          },
          "tags": [
            "patients"
          ]
        }
      },
      "/patients/{id}": {
        "get": {
          "operationId": "PatientsController_findOne",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/PatientEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "patients"
          ]
        },
        "patch": {
          "operationId": "PatientsController_update",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdatePatientDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/PatientEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "patients"
          ]
        },
        "delete": {
          "operationId": "PatientsController_remove",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/PatientEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "patients"
          ]
        }
      },
      "/casenotes/{id}": {
        "get": {
          "operationId": "NotesController_findOne",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NoteEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "casenotes"
          ]
        },
        "patch": {
          "operationId": "NotesController_update",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateNoteDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NoteEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "casenotes"
          ]
        },
        "delete": {
          "operationId": "NotesController_remove",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/NoteEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "casenotes"
          ]
        }
      },
      "/milestones/{id}": {
        "get": {
          "operationId": "MilestonesController_findOne",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/MilestoneEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "milestones"
          ]
        },
        "patch": {
          "operationId": "MilestonesController_update",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateMilestoneDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/MilestoneEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "milestones"
          ]
        },
        "delete": {
          "operationId": "MilestonesController_remove",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/MilestoneEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "milestones"
          ]
        }
      },
      "/solutions/{id}": {
        "get": {
          "operationId": "SolutionsController_findOne",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/SolutionEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "solutions"
          ]
        },
        "patch": {
          "operationId": "SolutionsController_update",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "requestBody": {
            "required": true,
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/UpdateSolutionDto"
                }
              }
            }
          },
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/SolutionEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "solutions"
          ]
        },
        "delete": {
          "operationId": "SolutionsController_remove",
          "parameters": [
            {
              "name": "id",
              "required": true,
              "in": "path",
              "schema": {
                "type": "number"
              }
            }
          ],
          "responses": {
            "201": {
              "description": "",
              "content": {
                "application/json": {
                  "schema": {
                    "$ref": "#/components/schemas/SolutionEntity"
                  }
                }
              }
            }
          },
          "tags": [
            "solutions"
          ]
        }
      }
    }
  },
  "customOptions": {},
  "swaggerUrl": {}
};
  url = options.swaggerUrl || url
  var urls = options.swaggerUrls
  var customOptions = options.customOptions
  var spec1 = options.swaggerDoc
  var swaggerOptions = {
    spec: spec1,
    url: url,
    urls: urls,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  }
  for (var attrname in customOptions) {
    swaggerOptions[attrname] = customOptions[attrname];
  }
  var ui = SwaggerUIBundle(swaggerOptions)

  if (customOptions.oauth) {
    ui.initOAuth(customOptions.oauth)
  }

  if (customOptions.authAction) {
    ui.authActions.authorize(customOptions.authAction)
  }

  window.ui = ui
}
