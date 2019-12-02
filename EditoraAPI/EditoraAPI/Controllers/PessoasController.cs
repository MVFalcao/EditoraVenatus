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
using EditoraAPI.Models;
using EditoraAPI.Tokens;

namespace EditoraAPI.Controllers
{
    public class PessoasController : ApiController
    {
        private EditoraAPIContext db = new EditoraAPIContext();
        private EncodingTokenLogin en = new EncodingTokenLogin();
        // GET: api/Pessoas
        public IQueryable<Pessoa> Getpessoas()
        {
            return db.pessoas;
        }

        // GET: api/Pessoas/5
        [ResponseType(typeof(Pessoa))]
        public IHttpActionResult GetPessoa(int id)
        {
            var headers = Request.Headers;
            if (headers.Contains("jwt"))
            {
                try
                {
                    en.ValidToken(headers.GetValues("jwt").First());
                }
                catch (Exception e)
                {
                    return NotFound();
                }

            }
            else
            {
                return NotFound();
            }
            var pes = from p in db.pessoas where p.Id_cli == id select p.ID_Pessoa;
            Pessoa pessoa = db.pessoas.Find(pes.First());
            if (pessoa == null)
            {
                return NotFound();
            }

            return Ok(pessoa);
        }

        // PUT: api/Pessoas/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPessoa(int id, Pessoa pessoa)
        {
            var headers = Request.Headers;
            if (headers.Contains("jwt"))
            {
                try
                {
                    en.ValidToken(headers.GetValues("jwt").First());
                }
                catch (Exception e)
                {
                    return NotFound();
                }

            }
            else
            {
                return NotFound();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != pessoa.ID_Pessoa)
            {
                return BadRequest();
            }

            db.Entry(pessoa).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PessoaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Pessoas
        [ResponseType(typeof(Pessoa))]
        public IHttpActionResult PostPessoa(Pessoa pessoa)
        {
            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.pessoas.Add(pessoa);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = pessoa.ID_Pessoa }, pessoa);
        }

        // DELETE: api/Pessoas/5
        [ResponseType(typeof(Pessoa))]
        public IHttpActionResult DeletePessoa(int id)
        {
            
            Pessoa pessoa = db.pessoas.Find(id);
            if (pessoa == null)
            {
                return NotFound();
            }

            db.pessoas.Remove(pessoa);
            db.SaveChanges();

            return Ok(pessoa);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PessoaExists(int id)
        {
            return db.pessoas.Count(e => e.ID_Pessoa == id) > 0;
        }
    }
}