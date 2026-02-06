## CREATE APP
```
nest new server
npm install @nestjs/typeorm typeorm pg class-validator class-transformer
```
- Migration
```
migration:generate
migration:run
migration:revert
```
- create modules
```
nest g resource karyawan
```