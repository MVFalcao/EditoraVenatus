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
    public class TB_Livro_AutorController : ApiController
    {
        private EditoraEntities db = new EditoraEntities();

        // GET: api/TB_Livro_Autor
        public IQueryable<TB_Livro_Autor> GetTB_Livro_Autor()
        {
            return db.TB_Livro_Autor;
        }

        // GET: api/TB_Livro_Autor/5
        [ResponseType(typeof(TB_Livro_Autor))]
        public IHttpActionResult GetTB_Livro_Autor(int id)
        {
            TB_Livro_Autor tB_Livro_Autor = db.TB_Livro_Autor.Find(id);
            if (tB_Livro_Autor == null)
            {
                return NotFound();
            }

            return Ok(tB_Livro_Autor);
        }

        // PUT: api/TB_Livro_Autor/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTB_Livro_Autor(int id, TB_Livro_Autor tB_Livro_Autor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tB_Livro_Autor.ID_Livro_Autor)
            {
                return BadRequest();
            }

            db.Entry(tB_Livro_Autor).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TB_Livro_AutorExists(id))
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

        // POST: api/TB_Livro_Autor
        [ResponseType(typeof(TB_Livro_Autor))]
        public IHttpActionResult PostTB_Livro_Autor(TB_Livro_Autor tB_Livro_Autor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TB_Livro_Autor.Add(tB_Livro_Autor);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (TB_Livro_AutorExists(tB_Livro_Autor.ID_Livro_Autor))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = tB_Livro_Autor.ID_Livro_Autor }, tB_Livro_Autor);
        }

        // DELETE: api/TB_Livro_Autor/5
        [ResponseType(typeof(TB_Livro_Autor))]
        public IHttpActionResult DeleteTB_Livro_Autor(int id)
        {
            TB_Livro_Autor tB_Livro_Autor = db.TB_Livro_Autor.Find(id);
            if (tB_Livro_Autor == null)
            {
                return NotFound();
            }

            db.TB_Livro_Autor.Remove(tB_Livro_Autor);
            db.SaveChanges();

            return Ok(tB_Livro_Autor);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TB_Livro_AutorExists(int id)
        {
            return db.TB_Livro_Autor.Count(e => e.ID_Livro_Autor == id) > 0;
        }
    }
}