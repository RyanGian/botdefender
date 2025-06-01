# Botdefender 

![Screenshot 2025-05-28 101205](https://github.com/user-attachments/assets/c22e1822-ea71-42f3-834b-33ef33bb4959)
![Screenshot 2025-05-28 101217](https://github.com/user-attachments/assets/b07ad045-07c7-402b-8877-536313dbcfdd)
![Screenshot 2025-05-28 101438](https://github.com/user-attachments/assets/bc1be092-a7c0-435b-b717-b7e211f3f4c0)

Idea: To understand and experiment with a rate-limiting mechanism to mitigate bot DDos-like attacks. A restriction is deployed whenever the threshold of backend endpoints has been reached. 

## How to locally run application

### React application (client)

```sh
cd techlector
```

```sh
yarn install
```

```sh
yarn dev
```

### Node application (server)
```sh
cd botdefender-be
```
```sh
npm install
```
```sh
node .
```

### Firebase credentials

- You will need your firebase credentials in the root of the file named `firebaseAdminConfig.js`
- Current collections are called: attacks, users, countries

Current Firebase Collections:

| attacks  |
| ------------- |
| name  | 
| country  | 
| time  | 
| id  | 



| users  |
| ------------- |
| name  | 
| country  | 
| banned  | 
| requests  | 



| countries |
| ------------- |
| countryName | 
| requests  | 
| banned  | 
| usersBanned  | 

### Software Architecture 

![Screenshot 2025-05-28 104140](https://github.com/user-attachments/assets/a1944d3e-1720-4947-834d-63b3901e8e9d)
