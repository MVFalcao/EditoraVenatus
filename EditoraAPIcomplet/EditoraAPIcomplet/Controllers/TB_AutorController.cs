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
using Newtonsoft;

namespace EditoraAPIcomplet.Controllers
{
    public class TB_AutorController : ApiController
    {
        private EditoraEntities db = new EditoraEntities();

        // GET: api/TB_Autor
        public IQueryable<TB_Autor> GetTB_Autor()
        {
            return db.TB_Autor;
        }

        // GET: api/TB_Autor/5
        [ResponseType(typeof(TB_Autor))]
        public IHttpActionResult GetTB_Autor(int id)
        {
            TB_Autor tB_Autor = db.TB_Autor.Find(id);
            if (tB_Autor == null)
            {
                return NotFound();
            }

            return Ok(tB_Autor);
        }

        // PUT: api/TB_Autor/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTB_Autor(int id, TB_Autor tB_Autor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tB_Autor.ID_Autor)
            {
                return BadRequest();
            }

            db.Entry(tB_Autor).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TB_AutorExists(id))
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

        // POST: api/TB_Autor
        [ResponseType(typeof(TB_Autor))]
        public IHttpActionResult PostTB_Autor(TB_Autor tB_Autor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TB_Autor.Add(tB_Autor);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (TB_AutorExists(tB_Autor.ID_Autor))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = tB_Autor.ID_Autor }, tB_Autor);
        }

        // DELETE: api/TB_Autor/5
        [ResponseType(typeof(TB_Autor))]
        public IHttpActionResult DeleteTB_Autor(int id)
        {
            TB_Autor tB_Autor = db.TB_Autor.Find(id);
            if (tB_Autor == null)
            {
                return NotFound();
            }

            db.TB_Autor.Remove(tB_Autor);
            db.SaveChanges();

            return Ok(tB_Autor);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TB_AutorExists(int id)
        {
            return db.TB_Autor.Count(e => e.ID_Autor == id) > 0;
        }
    }
}