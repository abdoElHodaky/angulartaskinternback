const swaggerAutogen = require('swagger-autogen')({openapi:"3.0.0"});

const outputFile = './swagger.json';
const endpointsFiles = ['./dist/routes.js','./dist/controllers/*.js','./dist/routes/*.js'];
const config = {
    info: {
        title: 'Elearning endpoints docs',
        description: '',
    },
    tags: [
    {
        name:"Auth",
        description:"Authentication"
    },
    {
        name:"Attachment",
        description:"Attachment endpoints"
    },
    {
      name: 'User',
      description: 'users endpoints'
    },
    {
      name: 'Author',
      description: 'authors endpoints'
    },
    {
        name:'Article',
        description:'articles endpoints'
    },
    {
       name:'suptickets',
       description:'tickets endpoints'
    }
    ],
    host: '',
    schemes: [],
    components:{
    schemas:{
            LoginUser:{
                username:"",
                passwordHash:""
            },
             CreateUser:{
                 username:"",
                 firstname:"",
                 lastname:"",
                 $IDcardNumber:2980865431210,
                 email:"",
                 $age:0
             },
             CreateAuthor:{
                 username:"",
                 firstname:"",
                 lastname:"",
                 $IDcardNumber:2980865431210,
                 email:"",
                 $age:0,
                 type:"author"
             },
            AddArticle:{
                cateogry:"",
                imgurl:"",
                content:"",
                title:"",
                $userid:4
            },
            userAddTicket:{
                $type:"inquiry|complaint",
                $subject:"greet",
                $description:"how are you?"
            },
            userSupTicket:{
                $userid:"4"
            },
            AddBook:{
               $userid:"4",
               $book:{
                   title:"",
                   description:"",
                   source:"",
                   thumbnail:""
               }
           }
    }
    }
};

swaggerAutogen(outputFile, endpointsFiles, config);
