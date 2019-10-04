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
    public class TB_LivroController : ApiController
    {
        private EditoraEntities db = new EditoraEntities();

        // GET: api/TB_Livro
        public IQueryable<TB_Livro> GetTB_Livro()
        {
            return db.TB_Livro;
        }

        // GET: api/TB_Livro/5
        [ResponseType(typeof(TB_Livro))]
        public IHttpActionResult GetTB_Livro(int id)
        {
            TB_Livro tB_Livro = db.TB_Livro.Find(id);
            if (tB_Livro == null)
            {
                return NotFound();
            }

            return Ok(tB_Livro);
        }

        // PUT: api/TB_Livro/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTB_Livro(int id, TB_Livro tB_Livro)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tB_Livro.ID_Livro)
            {
                return BadRequest();
            }

            db.Entry(tB_Livro).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TB_LivroExists(id))
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

        // POST: api/TB_Livro
        [ResponseType(typeof(TB_Livro))]
        public IHttpActionResult PostTB_Livro(TB_Livro tB_Livro)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TB_Livro.Add(tB_Livro);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (TB_LivroExists(tB_Livro.ID_Livro))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = tB_Livro.ID_Livro }, tB_Livro);
        }

        // DELETE: api/TB_Livro/5
        [ResponseType(typeof(TB_Livro))]
        public IHttpActionResult DeleteTB_Livro(int id)
        {
            TB_Livro tB_Livro = db.TB_Livro.Find(id);
            if (tB_Livro == null)
            {
                return NotFound();
            }

            db.TB_Livro.Remove(tB_Livro);
            db.SaveChanges();

            return Ok(tB_Livro);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TB_LivroExists(int id)
        {
            return db.TB_Livro.Count(e => e.ID_Livro == id) > 0;
        }
    }
}