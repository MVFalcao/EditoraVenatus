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
    public class TB_Cupom_LivroController : ApiController
    {
        private EditoraEntities db = new EditoraEntities();

        // GET: api/TB_Cupom_Livro
        public IQueryable<TB_Cupom_Livro> GetTB_Cupom_Livro()
        {
            return db.TB_Cupom_Livro;
        }

        // GET: api/TB_Cupom_Livro/5
        [ResponseType(typeof(TB_Cupom_Livro))]
        public IHttpActionResult GetTB_Cupom_Livro(int id)
        {
            TB_Cupom_Livro tB_Cupom_Livro = db.TB_Cupom_Livro.Find(id);
            if (tB_Cupom_Livro == null)
            {
                return NotFound();
            }

            return Ok(tB_Cupom_Livro);
        }

        // PUT: api/TB_Cupom_Livro/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTB_Cupom_Livro(int id, TB_Cupom_Livro tB_Cupom_Livro)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tB_Cupom_Livro.ID_Cupom_Livro)
            {
                return BadRequest();
            }

            db.Entry(tB_Cupom_Livro).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TB_Cupom_LivroExists(id))
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

        // POST: api/TB_Cupom_Livro
        [ResponseType(typeof(TB_Cupom_Livro))]
        public IHttpActionResult PostTB_Cupom_Livro(TB_Cupom_Livro tB_Cupom_Livro)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TB_Cupom_Livro.Add(tB_Cupom_Livro);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (TB_Cupom_LivroExists(tB_Cupom_Livro.ID_Cupom_Livro))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = tB_Cupom_Livro.ID_Cupom_Livro }, tB_Cupom_Livro);
        }

        // DELETE: api/TB_Cupom_Livro/5
        [ResponseType(typeof(TB_Cupom_Livro))]
        public IHttpActionResult DeleteTB_Cupom_Livro(int id)
        {
            TB_Cupom_Livro tB_Cupom_Livro = db.TB_Cupom_Livro.Find(id);
            if (tB_Cupom_Livro == null)
            {
                return NotFound();
            }

            db.TB_Cupom_Livro.Remove(tB_Cupom_Livro);
            db.SaveChanges();

            return Ok(tB_Cupom_Livro);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TB_Cupom_LivroExists(int id)
        {
            return db.TB_Cupom_Livro.Count(e => e.ID_Cupom_Livro == id) > 0;
        }
    }
}