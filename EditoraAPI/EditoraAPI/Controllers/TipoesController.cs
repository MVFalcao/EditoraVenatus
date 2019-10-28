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
    public class TipoesController : ApiController
    {
        private EditoraAPIContext db = new EditoraAPIContext();

        // GET: api/Tipoes
        public IQueryable<Tipo> Gettipos()
        {
            return db.tipos;
        }

        // GET: api/Tipoes/5
        [ResponseType(typeof(Tipo))]
        public IHttpActionResult GetTipo(int id)
        {
            Tipo tipo = db.tipos.Find(id);
            if (tipo == null)
            {
                return NotFound();
            }

            return Ok(tipo);
        }

        // PUT: api/Tipoes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTipo(int id, Tipo tipo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tipo.ID_Tipo)
            {
                return BadRequest();
            }

            db.Entry(tipo).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TipoExists(id))
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

        // POST: api/Tipoes
        [ResponseType(typeof(Tipo))]
        public IHttpActionResult PostTipo(Tipo tipo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.tipos.Add(tipo);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tipo.ID_Tipo }, tipo);
        }

        // DELETE: api/Tipoes/5
        [ResponseType(typeof(Tipo))]
        public IHttpActionResult DeleteTipo(int id)
        {
            Tipo tipo = db.tipos.Find(id);
            if (tipo == null)
            {
                return NotFound();
            }

            db.tipos.Remove(tipo);
            db.SaveChanges();

            return Ok(tipo);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TipoExists(int id)
        {
            return db.tipos.Count(e => e.ID_Tipo == id) > 0;
        }
    }
}