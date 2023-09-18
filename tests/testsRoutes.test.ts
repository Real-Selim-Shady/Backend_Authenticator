/*import supertest from 'supertest';
import createServer from '../src/utils/server';
import User from '../src/models/User';


const app = createServer();

describe('Testing the app', ()=>{

  beforeAll(async() => {
    const { sequelizeMock } = require('./sequelizeMock');
    // Remplacement de sequelize par le mock
    jest.mock('../src/db/sequelize', () => ({
      ...jest.requireActual('../src/db/sequelize'),
      sequelize: sequelizeMock,
    }));
    // Importation de sequelizeModule après avoir défini le mock
    const sequelizeModule = require('../src/db/sequelize');
    await sequelizeModule.initDb();
    jest.spyOn(sequelizeModule.sequelize, 'define').mockReturnValue(User);
  })
  afterAll(async () => {
    jest.clearAllMocks();
    //await sequelizeModule.sequelize.close();

  });  
  
  describe('testing createUser route',()=>{
    describe('given User is adding an account by providing new userName, and also password, firstName, lastName',()=>{
      it('should provide a response 200', async()=>{

        // Espionnage de la méthode create du modèle User (pas emptyModel)
        const createSpy = jest.spyOn(User, 'create');


        const requestBody = {
          firstName: 'Hyur',
          lastName: 'Hyur',
          userName: 'Hyur',
          password: 'Hyur',
        };
        await supertest(app)
          .post(`/api/createUser`)
          .send(requestBody)
          .expect(200)

        // Vérification que la méthode create a été appelée avec les bonnes données
        expect(createSpy).toHaveBeenCalledWith(requestBody);
      })
    })
    describe('given User is adding an account by providing existing userName, and also password, firstName, lastName',()=>{
      it('should provide an error 400', async()=>{
        const requestBody = {
          firstName: 'Lala',
          lastName: 'Fell',
          userName: 'Lalafell',
          password: 'Lalafell',
        };
        await supertest(app)
          .post(`/api/createUser`)
          .send(requestBody)
          .expect(400)
      })
    })
  })
  
  describe('testing login route',()=>{
    describe('given User is trying to connect to an existing account, providing acceptable data', ()=>{+
      it('should give a response 200', async()=>{
        const requestBody = {
          userName: 'Lalafell',
          password: 'Lalafell',
        };
        await supertest(app)
          .post(`/api/login`)
          .send(requestBody)
          .expect(200)
      })
    })
    describe('given User is trying to connect to an non existing account', ()=>{
      it('should give an error 404', async()=>{
        const requestBody = {
          userName: 'Lalafell2',
          password: 'Lalafell',
        };
        await supertest(app)
          .post(`/api/login`)
          .send(requestBody)
          .expect(404)
      })
    })
    describe('given User is trying to connect to an existing account, providing a wrong password', ()=>{
      it('should give an error 401', async()=>{
        const requestBody = {
          userName: 'Lalafell',
          password: 'Lalafell2',
        };
        await supertest(app)
          .post(`/api/login`)
          .send(requestBody)
          .expect(401)
      })
    })
  })

  describe('testing editUser route',()=>{
    describe('given User is trying to edit an account without token (without being connected', ()=>{
      it('should give an error 401', async()=>{
        const idSent = 1;
        await supertest(app)
          .put(`/api/editUser/${idSent}`)
          .expect(401)
      })
    })
    describe('given user is connected and try to edit its account', ()=>{
      it('should be able to edit user', async()=>{
        let authToken: any;
        const requestBody = {
          userName: 'Aura',
          password: 'Aura',
        };
        const response = await supertest(app)
          .post(`/api/login`)
          .send(requestBody)
          .expect(200)
        
        authToken = response.body.token;
      
        const newData = {
          firstName: 'Aura2',
          lastName: 'Aura2',
          userName: 'Aura2',
          password: 'Aura2',
        }
      
        await supertest(app)
          .put('/api/editUser/2')
          .set('Authorization', `Bearer ${authToken}`)
          .send(newData)
          .expect(200);
      })
    })
    describe('given User is connected, but is trying to edit another account', ()=>{
      it('should give an error 401', async()=>{
        let authToken: any;
        const requestBody = {
          userName: 'Lalafell',
          password: 'Lalafell',
        };
        const response = await supertest(app)
          .post(`/api/login`)
          .send(requestBody)
          .expect(200)
        
        authToken = response.body.token;
      
        const newData = {
          firstName: 'Lalafell',
          lastName: 'Lalafell',
          userName: 'Lalafell2',
          password: 'Lalafell2',
        }
      
        await supertest(app)
          .put('/api/editUser/2')
          .set('Authorization', `Bearer ${authToken}`)
          .send(newData)
          .expect(401);
      })
    })
    describe('given User is connected, but is trying to edit his account adding an already existing userName', ()=>{
      it('should give an error 400', async()=>{
        let authToken: any;
        const requestBody = {
          userName: 'Lalafell',
          password: 'Lalafell',
        };
        const response = await supertest(app)
          .post(`/api/login`)
          .send(requestBody)
          .expect(200)
        
        authToken = response.body.token;
      
        const newData = {
          firstName: 'Aura2',
          lastName: 'Aura2',
          userName: 'Aura2',
          password: 'Aura2',
        }
      
        await supertest(app)
          .put('/api/editUser/1')
          .set('Authorization', `Bearer ${authToken}`)
          .send(newData)
          .expect(400);
      })
    })
    describe('given User connected to its account, deleted its account, then, is trying to edit this deleted account', ()=>{
      it('should give an error 404', async()=>{
        let authToken: any;
        const requestBody = {
          userName: 'Lalafell',
          password: 'Lalafell',
        };
        const response = await supertest(app)
          .post(`/api/login`)
          .send(requestBody)
          .expect(200)
        
        authToken = response.body.token;

        const newData = {
          firstName: 'Lalafell2',
          lastName: 'Lalafell2',
          userName: 'Lalafell2',
          password: 'Lalafell2',
        }
      
        await supertest(app)
          .delete('/api/deleteUser/1')
          .set('Authorization', `Bearer ${authToken}`)
          .expect(200);
        
        await supertest(app)
          .put('/api/editUser/1')
          .set('Authorization', `Bearer ${authToken}`)
          .send(newData)
          .expect(404);
      })
    })
  })

  describe('testing deleteUser route',()=>{
    describe('Given user is trying to delete wrong account', ()=>{
      it('should give an error 401', async()=>{
        let authToken: any;
        const requestBody = {
          userName: 'Hyurgoth',
          password: 'Hyurgoth',
        };
        const response = await supertest(app)
          .post(`/api/login`)
          .send(requestBody)
          .expect(200)
        
        authToken = response.body.token;
      
        await supertest(app)
          .delete('/api/deleteUser/2')
          .set('Authorization', `Bearer ${authToken}`)
          .expect(401);
      })
    })
    describe('Given user is trying to delete his account after being connected', ()=>{
      it('should give a response 200', async()=>{
        let authToken: any;
        const requestBody = {
          userName: 'Hyurgoth',
          password: 'Hyurgoth',
        };
        const response = await supertest(app)
          .post(`/api/login`)
          .send(requestBody)
          .expect(200)
        
        authToken = response.body.token;
      
        await supertest(app)
          .delete('/api/deleteUser/3')
          .set('Authorization', `Bearer ${authToken}`)
          .expect(200);
      })
      describe('Given user is trying to delete his account twice or more', ()=>{
        it('should give an error 404', async()=>{
          let authToken: any;
          const requestBody = {
            userName: 'Hyur',
            password: 'Hyur',
          };
          const response = await supertest(app)
            .post(`/api/login`)
            .send(requestBody)
            .expect(200)
          
          authToken = response.body.token;
        
          await supertest(app)
            .delete('/api/deleteUser/4')
            .set('Authorization', `Bearer ${authToken}`)
            .expect(200);
          
          await supertest(app)
            .delete('/api/deleteUser/4')
            .set('Authorization', `Bearer ${authToken}`)
            .expect(404);
        })
      })
    })
  })

})
*/