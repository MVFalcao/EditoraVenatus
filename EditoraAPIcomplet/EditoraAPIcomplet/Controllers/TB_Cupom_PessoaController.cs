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
using EditoraAPIcomplet.Models;

namespace EditoraAPIcomplet.Controllers
{
    public class TB_Cupom_PessoaController : ApiController
    {
        private EditoraEntities db = new EditoraEntities();

        // GET: api/TB_Cupom_Pessoa
        public IQueryable<TB_Cupom_Pessoa> GetTB_Cupom_Pessoa()
        {
            return db.TB_Cupom_Pessoa;
        }

        // GET: api/TB_Cupom_Pessoa/5
        [ResponseType(typeof(TB_Cupom_Pessoa))]
        public IHttpActionResult GetTB_Cupom_Pessoa(int id)
        {
            TB_Cupom_Pessoa tB_Cupom_Pessoa = db.TB_Cupom_Pessoa.Find(id);
            if (tB_Cupom_Pessoa == null)
            {
                return NotFound();
            }

            return Ok(tB_Cupom_Pessoa);
        }

        // PUT: api/TB_Cupom_Pessoa/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTB_Cupom_Pessoa(int id, TB_Cupom_Pessoa tB_Cupom_Pessoa)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tB_Cupom_Pessoa.ID_Cupom_Pessoa)
            {
                return BadRequest();
            }

            db.Entry(tB_Cupom_Pessoa).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TB_Cupom_PessoaExists(id))
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

        // POST: api/TB_Cupom_Pessoa
        [ResponseType(typeof(TB_Cupom_Pessoa))]
        public IHttpActionResult PostTB_Cupom_Pessoa(TB_Cupom_Pessoa tB_Cupom_Pessoa)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TB_Cupom_Pessoa.Add(tB_Cupom_Pessoa);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (TB_Cupom_PessoaExists(tB_Cupom_Pessoa.ID_Cupom_Pessoa))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = tB_Cupom_Pessoa.ID_Cupom_Pessoa }, tB_Cupom_Pessoa);
        }

        // DELETE: api/TB_Cupom_Pessoa/5
        [ResponseType(typeof(TB_Cupom_Pessoa))]
        public IHttpActionResult DeleteTB_Cupom_Pessoa(int id)
        {
            TB_Cupom_Pessoa tB_Cupom_Pessoa = db.TB_Cupom_Pessoa.Find(id);
            if (tB_Cupom_Pessoa == null)
            {
                return NotFound();
            }

            db.TB_Cupom_Pessoa.Remove(tB_Cupom_Pessoa);
            db.SaveChanges();

            return Ok(tB_Cupom_Pessoa);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TB_Cupom_PessoaExists(int id)
        {
            return db.TB_Cupom_Pessoa.Count(e => e.ID_Cupom_Pessoa == id) > 0;
        }
    }
}