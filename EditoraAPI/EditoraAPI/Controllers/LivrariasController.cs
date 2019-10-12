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
    public class LivrariasController : ApiController
    {
        private BancoEditora db = new BancoEditora();

        // GET: api/Livrarias
        public IQueryable<Livraria> GetLivrarias()
        {
            return db.Livrarias;
        }

        // GET: api/Livrarias/5
        [ResponseType(typeof(Livraria))]
        public IHttpActionResult GetLivraria(int id)
        {
            Livraria livraria = db.Livrarias.Find(id);
            if (livraria == null)
            {
                return NotFound();
            }

            return Ok(livraria);
        }

        // PUT: api/Livrarias/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutLivraria(int id, Livraria livraria)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != livraria.ID_Livraria)
            {
                return BadRequest();
            }

            db.Entry(livraria).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LivrariaExists(id))
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

        // POST: api/Livrarias
        [ResponseType(typeof(Livraria))]
        public IHttpActionResult PostLivraria(Livraria livraria)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Livrarias.Add(livraria);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = livraria.ID_Livraria }, livraria);
        }

        // DELETE: api/Livrarias/5
        [ResponseType(typeof(Livraria))]
        public IHttpActionResult DeleteLivraria(int id)
        {
            Livraria livraria = db.Livrarias.Find(id);
            if (livraria == null)
            {
                return NotFound();
            }

            db.Livrarias.Remove(livraria);
            db.SaveChanges();

            return Ok(livraria);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LivrariaExists(int id)
        {
            return db.Livrarias.Count(e => e.ID_Livraria == id) > 0;
        }
    }
}