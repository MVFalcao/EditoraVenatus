using EditoraAPI.Tokens;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Script.Serialization;

namespace EditoraAPI.Models {
    public class EnderecosController : ApiController {
        private EditoraAPIContext db = new EditoraAPIContext();
        private EncodingTokenLogin en = new EncodingTokenLogin();
        // GET: api/Enderecos
        public IQueryable<Endereco> Getenderecos() {
            return db.enderecos;
        }

        [ResponseType(typeof(Endereco))]
        [Route("api/GetEndereco/")]
        public IHttpActionResult GetEndereco(int id) {
            try {
                var end = from ed in db.enderecos where ed.ID_Endereco == id select new { ed.autor, ed.cliente, ed.Nome_Proprietario, ed.Bairro, ed.CEP, ed.Cidade,  ed.Complemento, ed.Logradouro, ed.Numero, ed.ID_Endereco };
                //Endereco endereco = db.enderecos.Find(id_end.First());
                if(end == null) {
                    return NotFound();
                }

                return Ok(end);
            }
            catch(Exception e) {
                return NotFound();
            }

        }

        // GET: api/Enderecos/5
        [ResponseType(typeof(Endereco))]
        [Route("api/GetClienteEndereco/")]
        public IHttpActionResult GetEnderecocliente(int id) {
            try {
                var end = from ed in db.enderecos where ed.cliente == id select new { ed.autor, ed.Bairro, ed.CEP, ed.Cidade, ed.cliente, ed.Complemento, ed.ID_Endereco };
                //Endereco endereco = db.enderecos.Find(id_end.First());
                if(end == null) {
                    return NotFound();
                }

                return Ok(end);
            }
            catch(Exception e) {
                return NotFound();
            }

        }
        [ResponseType(typeof(Endereco))]
        [Route("api/GetAutorEndereco/")]
        public IHttpActionResult GetEnderecoAutor(int id) {
            try {
                //var jason = string.Empty;
                var end = from ed in db.enderecos where ed.autor == id select new { ed.autor, ed.Bairro, ed.CEP, ed.Cidade, ed.cliente, ed.Complemento, ed.ID_Endereco };
                //Endereco endereco = db.enderecos.Find(id_end.First());
                if(end == null) {
                    return NotFound();
                }
                //JavaScriptSerializer jss = new JavaScriptSerializer();
                //jason = jss.Serialize(end);
                return Ok(end);
            }
            catch(Exception e) {
                return NotFound();
            }
        }
        // PUT: api/Enderecos/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEndereco(int id, Endereco endereco) {

            if(!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            if(id != endereco.ID_Endereco) {
                return BadRequest();
            }

            db.Entry(endereco).State = EntityState.Modified;

            try {
                db.SaveChanges();
            }
            catch(DbUpdateConcurrencyException) {
                if(!EnderecoExists(id)) {
                    return NotFound();
                } else {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Enderecos
        [ResponseType(typeof(Endereco))]
        public IHttpActionResult PostEndereco(Endereco endereco) {

            if(!ModelState.IsValid) {
                return BadRequest(ModelState);
            }

            db.enderecos.Add(endereco);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = endereco.ID_Endereco }, endereco);
        }

        // DELETE: api/Enderecos/5
        [ResponseType(typeof(Endereco))]
        public IHttpActionResult DeleteEndereco(int id) {
            Endereco endereco = db.enderecos.Find(id);
            if(endereco == null) {
                return NotFound();
            }

            db.enderecos.Remove(endereco);
            db.SaveChanges();

            return Ok(endereco);
        }

        protected override void Dispose(bool disposing) {
            if(disposing) {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EnderecoExists(int id) {
            return db.enderecos.Count(e => e.ID_Endereco == id) > 0;
        }
    }
}