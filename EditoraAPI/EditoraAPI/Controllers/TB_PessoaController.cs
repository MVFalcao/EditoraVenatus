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

namespace EditoraAPI.Controllers
{
    public class TB_PessoaController : ApiController
    {
        private EditoraEntities db = new EditoraEntities();

        // GET: api/TB_Pessoa
        public IQueryable<TB_Pessoa> GetTB_Pessoa()
        {
            return db.TB_Pessoa;
        }

        // GET: api/TB_Pessoa/5
        [ResponseType(typeof(TB_Pessoa))]
        public IHttpActionResult GetTB_Pessoa(int id)
        {
            TB_Pessoa tB_Pessoa = db.TB_Pessoa.Find(id);
            if (tB_Pessoa == null)
            {
                return NotFound();
            }

            return Ok(tB_Pessoa);
        }

        // PUT: api/TB_Pessoa/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTB_Pessoa(int id, TB_Pessoa tB_Pessoa)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tB_Pessoa.ID_Pessoa)
            {
                return BadRequest();
            }

            db.Entry(tB_Pessoa).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TB_PessoaExists(id))
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

        // POST: api/TB_Pessoa
        [ResponseType(typeof(TB_Pessoa))]
        public IHttpActionResult PostTB_Pessoa(TB_Pessoa tB_Pessoa)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TB_Pessoa.Add(tB_Pessoa);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (TB_PessoaExists(tB_Pessoa.ID_Pessoa))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = tB_Pessoa.ID_Pessoa }, tB_Pessoa);
        }

        // DELETE: api/TB_Pessoa/5
        [ResponseType(typeof(TB_Pessoa))]
        public IHttpActionResult DeleteTB_Pessoa(int id)
        {
            TB_Pessoa tB_Pessoa = db.TB_Pessoa.Find(id);
            if (tB_Pessoa == null)
            {
                return NotFound();
            }

            db.TB_Pessoa.Remove(tB_Pessoa);
            db.SaveChanges();

            return Ok(tB_Pessoa);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TB_PessoaExists(int id)
        {
            return db.TB_Pessoa.Count(e => e.ID_Pessoa == id) > 0;
        }
    }
}