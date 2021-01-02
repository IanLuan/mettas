# Mettas Backend
The backend for Mettas app.

## Made with
- Node.js
- MongoDB
- Mongoose

## API Endpoints

#### Metta Endpoints
| METHOD | ENDPOINT |  USAGE | RETURNS |
|--|--|--|--|
| GET | `/me/mettas` | Get a List of a User's Mettas | mettas |
| POST | `/me/mettas` | Create a Metta | - |
| GET | `/mettas/{metta_id}` | Get a Metta | metta |
| PUT | `/mettas/{metta_id}` | Change a Metta's Details | - |
| DELETE | `/mettas/{metta_id}` | Remove a Metta | - |
| GET | `/mettas/{metta_id}/transactions` | Get a Metta's Transactions | transactions |
| POST | `/mettas/{metta_id}/transactions` | Add Transaction to a Metta | - |
| GET | `/mettas/{metta_id}/transactions/{transaction_id}` | Get a Transaction | transaction |
| DELETE | `/mettas/{metta_id}/transactions/{transaction_id}` | Remove a Transaction from Metta | - |

#

#### Auth Endpoints
| METHOD | ENDPOINT |  USAGE | RETURNS |
|--|--|--|--|
| POST | `/signup` | Register a User | token |
| POST | `/signin` | Authenticate a User | token |

#

#### User Endpoints
| METHOD | ENDPOINT |  USAGE | RETURNS |
|--|--|--|--|
| POST | `/me` | Get Current user | user |
