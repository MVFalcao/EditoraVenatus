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
    public class LivroesController : ApiController
    {
        private EditoraAPIContext db = new EditoraAPIContext();

        // GET: api/Livroes
        public IQueryable<Livro> Getlivros()
        {
            return db.livros;
        }

        // GET: api/Livroes/5
        [ResponseType(typeof(Livro))]
        public IHttpActionResult GetLivro(int id)
        {
            Livro livro = db.livros.Find(id);
            if (livro == null)
            {
                return NotFound();
            }

            return Ok(livro);
        }

        // PUT: api/Livroes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutLivro(int id, Livro livro)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != livro.ID_Livro)
            {
                return BadRequest();
            }

            db.Entry(livro).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LivroExists(id))
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

        // POST: api/Livroes
        [ResponseType(typeof(Livro))]
        public IHttpActionResult PostLivro(Livro livro)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.livros.Add(livro);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = livro.ID_Livro }, livro);
        }

        // DELETE: api/Livroes/5
        [ResponseType(typeof(Livro))]
        public IHttpActionResult DeleteLivro(int id)
        {
            Livro livro = db.livros.Find(id);
            if (livro == null)
            {
                return NotFound();
            }

            db.livros.Remove(livro);
            db.SaveChanges();

            return Ok(livro);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LivroExists(int id)
        {
            return db.livros.Count(e => e.ID_Livro == id) > 0;
        }
    }
}