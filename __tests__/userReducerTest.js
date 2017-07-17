
// this file is saved in '__tests__'

// Be sure to modify your package.json to add "test": "jest"
/*
"scripts": {

         "test": "jest"

     }

*/

import userReducer from '../build/reducers/user'; // import the reducer we are testing here


const user = { // default redux state - see how defined this in  you appstore
    email: "",
    endPoints: []
}

describe("user reducer", () => {
    it("should login user", () => {
        expect(userReducer(user, { //what we are passing into the action creator
            type: 'USER_LOGIN',
            user: { _id:"a1231sd",
                    email: "test@test.com",
                    "password": "blah",
                    endPoint: [
                                    {
                                        "upStreamConfUrl": "",
                                        "description": "test string",
                                        "statusApiUrl": "https://demo.nginx.com/status/upstreams/trac-backend",
                                        "name": "test",
                                        "_id": "596123867e260212609df897",
                                        "createdDate": "2017-07-14T03:54:46.693Z"
                                    },
                                    {
                                        "upStreamConfUrl": "",
                                        "description": "Production Traffic",
                                        "statusApiUrl": "https://demo.nginx.com/status/upstreams/trac-backend",
                                        "name": "my production website",
                                        "_id": "5969ab7780e4fas2e0795e0f",
                                        "createdDate": "2017-07-15T05:43:19.198Z"
                                    }
                                ]
            }
        })).toEqual({ //what it looks like in redux state
                    email: "test@test.com",
                    endPoints: [
                                    {
                                        "upStreamConfUrl": "",
                                        "description": "test string",
                                        "statusApiUrl": "https://demo.nginx.com/status/upstreams/trac-backend",
                                        "name": "test",
                                        "_id": "596123867e260212609df897",
                                        "createdDate": "2017-07-14T03:54:46.693Z"
                                    },
                                    {
                                        "upStreamConfUrl": "",
                                        "description": "Production Traffic",
                                        "statusApiUrl": "https://demo.nginx.com/status/upstreams/trac-backend",
                                        "name": "my production website",
                                        "_id": "5969ab7780e4fas2e0795e0f",
                                        "createdDate": "2017-07-15T05:43:19.198Z"
                                    }
                                ]
            });
    });
    it.skip("should logout user");
    it.skip("add upstream");
    it.skip("remove upstream");
});