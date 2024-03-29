/*
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app.js');
const BookService = require("../src/services/bookService.js").BookService;
const expect = require('chai').expect

chai.use(chaiHttp);

let buffer;

const newBook = {
    name:"Test",
    author:"test",
    description:"test"
};

describe('Testing Api', function (){
    it('GET /books', (done)=> {
        chai.request(app)
            .get('/api/books')
            .end(function(err, res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(err).to.be.null;
                expect(res.body.book[0]).to.have.property('_id');
                expect(res.body.book[0]).to.have.property('name')
                expect(res.body.book[0]).to.have.property('author')
                expect(res.body.book[0]).to.have.property('description')
                done()
            });
    });

    it('POST /books',  (done)=>{
            chai.request(app)
                .post('/api/books')
                .send(newBook)
                .end(function (err, res){
                    buffer = res.body.book._id;
                    expect(res).to.have.status(200)
                    expect(res).to.be.json;
                    expect(err).to.have.null
                    expect(res.body.book).to.have.property('_id')
                    expect(res.body.book).to.have.property('name').with.eql(newBook.name);
                    expect(res.body.book).to.have.property('author').with.eql(newBook.author);
                    expect(res.body.book).to.have.property('description').with.eql(newBook.description);
                    done()
                    BookService.delete(res.body.book._id);
                })
    });

    it('GET /books/search by name', (done)=>{
            new Promise( async function (resolve){
                buffer = await BookService.create(newBook);
                resolve(buffer);
            }).then((result)=>{
                chai.request(app)
                    .get('/api/books/search?data='+result.name+'&typeSearch=name')
                    .end((err, res)=>{
                        expect(res).to.have.status(200);
                        expect(res).to.be.json;
                        expect(err).to.be.null;
                        expect(res.body.book[0]).to.have.property('_id');
                        expect(res.body.book[0]).to.have.property('name');
                        expect(res.body.book[0]).to.have.property('author');
                        expect(res.body.book[0]).to.have.property('description');
                        done()
                    })
            }).finally(()=>{
                BookService.delete(buffer._id);
            })

    })

    it('GET /books/search by name NOT FOUND', (done)=>{
        new Promise( async function (resolve){
            buffer = await BookService.create(newBook);
            resolve(buffer);
        }).then((result)=>{
            chai.request(app)
                .get('/api/books/search?data='+result.name+'NOTFOUND'+'&typeSearch=name')
                .end((err, res)=>{
                    expect(res).to.have.status(404);
                    expect(res).to.be.text;
                    expect(err).to.be.null;
                    done()
                })
        }).finally(()=>{
            BookService.delete(buffer._id);
        })

    })

    it('GET /books/search by author',(done)=>{
        new Promise( async function (resolve){
            buffer = await BookService.create(newBook);
            resolve(buffer);
        }).then((result)=>{
            chai.request(app)
                .get('/api/books/search?data='+result.author+'&typeSearch=author')
                .end((err, res)=>{
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(err).to.be.null;
                    expect(res.body.book[0]).to.have.property('_id');
                    expect(res.body.book[0]).to.have.property('name');
                    expect(res.body.book[0]).to.have.property('author');
                    expect(res.body.book[0]).to.have.property('description');
                    done()
                })
        }).finally(()=>{
            BookService.delete(buffer._id);
        })
    });

    it('GET /books/search by author NOT FOUND', (done)=>{
        new Promise( async function (resolve){
            buffer = await BookService.create(newBook);
            resolve(buffer);
        }).then((result)=>{
            chai.request(app)
                .get('/api/books/search?data='+result.author+'NOTFOUND'+'&typeSearch=author')
                .end((err, res)=>{
                    expect(res).to.have.status(404);
                    expect(res).to.be.text;
                    expect(err).to.be.null;
                    done()
                })
        }).finally(()=>{
            BookService.delete(buffer._id);
        })

    })

    it('GET /books/:id',(done)=>{
        new Promise(async (resolve)=>{
            buffer = await BookService.create(newBook);
            resolve(buffer)
        }).then((result)=> {
            chai.request(app)
                .get('/api/books/'+ result._id)
                .end((err, res)=>{
                    expect(err).to.be.null;
                    expect(res).to.be.json;
                    expect(res.body.book[0]).to.have.property('_id');
                    expect(res.body.book[0]).to.have.property('name').with.eql(result.name);
                    expect(res.body.book[0]).to.have.property('author').with.eql(result.author);
                    expect(res.body.book[0]).to.have.property('description').with.eql(result.description);
                    done()
                    BookService.delete(buffer._id);
                })
        })
    })

    it('DELETE /book/:id', (done)=>{
        new Promise(async (resolve)=>{
            buffer = await BookService.create(newBook);
            resolve(buffer);
        }).then((result)=>{
            chai.request(app)
                .delete('/api/book/'+ result._id)
                .end((err, res)=>{
                    expect(err).to.be.null;
                    expect(res).to.have.json;
                    expect(res.body.book).to.have.property('_id');
                    expect(res.body.book).to.have.property('name').with.eql(buffer.name);
                    expect(res.body.book).to.have.property('author').with.eql(buffer.author);
                    expect(res.body.book).to.have.property('description').with.eql(buffer.description);
                    done()
                })
        })
    })

    it('PUT /books', (done)=>{
        new Promise(async (resolve)=>{
            buffer = await BookService.create(newBook);
            buffer.name ="TestPUT"
            resolve(buffer)
        }).then((result)=>{
            chai.request(app)
                .put('/api/books')
                .send(result)
                .end((err, res)=>{
                    expect(err).to.have.null;
                    expect(res).to.have.status(200);
                    expect(res).to.be.json;
                    expect(res.body.book).to.have.property('name').with.eql(buffer.name);
                    expect(res.body.book).to.have.property('author').with.eql(buffer.author);
                    expect(res.body.book).to.have.property('description').with.eql(buffer.description);
                    done()
                    BookService.delete(buffer._id)
                })
        })
    })

})
*/


