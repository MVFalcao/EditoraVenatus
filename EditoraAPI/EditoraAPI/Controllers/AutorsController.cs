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
    public class AutorsController : ApiController
    {
        private BancoEditora db = new BancoEditora();

        // GET: api/Autors
        public IQueryable<Autor> GetAutors()
        {
            return db.Autors;
        }

        // GET: api/Autors/5
        [ResponseType(typeof(Autor))]
        public IHttpActionResult GetAutor(int id)
        {
            Autor autor = db.Autors.Find(id);
            if (autor == null)
            {
                return NotFound();
            }

            return Ok(autor);
        }

        // PUT: api/Autors/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAutor(int id, Autor autor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != autor.ID_Autor)
            {
                return BadRequest();
            }

            db.Entry(autor).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AutorExists(id))
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

        // POST: api/Autors
        [ResponseType(typeof(Autor))]
        public IHttpActionResult PostAutor(Autor autor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Autors.Add(autor);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = autor.ID_Autor }, autor);
        }

        // DELETE: api/Autors/5
        [ResponseType(typeof(Autor))]
        public IHttpActionResult DeleteAutor(int id)
        {
            Autor autor = db.Autors.Find(id);
            if (autor == null)
            {
                return NotFound();
            }

            db.Autors.Remove(autor);
            db.SaveChanges();

            return Ok(autor);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AutorExists(int id)
        {
            return db.Autors.Count(e => e.ID_Autor == id) > 0;
        }
    }
}