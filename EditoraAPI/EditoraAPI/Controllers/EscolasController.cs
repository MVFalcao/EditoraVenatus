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
    public class EscolasController : ApiController
    {
        private BancoEditora db = new BancoEditora();

        // GET: api/Escolas
        public IQueryable<Escola> GetEscolas()
        {
            return db.Escolas;
        }

        // GET: api/Escolas/5
        [ResponseType(typeof(Escola))]
        public IHttpActionResult GetEscola(int id)
        {
            Escola escola = db.Escolas.Find(id);
            if (escola == null)
            {
                return NotFound();
            }

            return Ok(escola);
        }

        // PUT: api/Escolas/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEscola(int id, Escola escola)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != escola.ID_Escola)
            {
                return BadRequest();
            }

            db.Entry(escola).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EscolaExists(id))
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

        // POST: api/Escolas
        [ResponseType(typeof(Escola))]
        public IHttpActionResult PostEscola(Escola escola)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Escolas.Add(escola);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = escola.ID_Escola }, escola);
        }

        // DELETE: api/Escolas/5
        [ResponseType(typeof(Escola))]
        public IHttpActionResult DeleteEscola(int id)
        {
            Escola escola = db.Escolas.Find(id);
            if (escola == null)
            {
                return NotFound();
            }

            db.Escolas.Remove(escola);
            db.SaveChanges();

            return Ok(escola);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EscolaExists(int id)
        {
            return db.Escolas.Count(e => e.ID_Escola == id) > 0;
        }
    }
}