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
using EditoraAPI.Tokens;

namespace EditoraAPI.Controllers
{
    public class EscolasController : ApiController
    {
        private EditoraAPIContext db = new EditoraAPIContext();
        private EncodingTokenLogin en = new EncodingTokenLogin();
        // GET: api/Escolas
        public IQueryable<Escola> Getescolas()
        {
            return db.escolas;
        }

        // GET: api/Escolas/5
        [ResponseType(typeof(Escola))]
        public IHttpActionResult GetEscola(int id)
        {
            Escola escola = db.escolas.Find(id);
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
            var headers = Request.Headers;
            if (headers.Contains("jwt"))
            {
                try
                {
                    en.ValidToken(headers.GetValues("jwt").First());
                }
                catch (Exception e)
                {
                    return NotFound();
                }

            }
            else
            {
                return NotFound();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.escolas.Add(escola);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = escola.ID_Escola }, escola);
        }

        // DELETE: api/Escolas/5
        [ResponseType(typeof(Escola))]
        public IHttpActionResult DeleteEscola(int id)
        {
            Escola escola = db.escolas.Find(id);
            if (escola == null)
            {
                return NotFound();
            }

            db.escolas.Remove(escola);
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
            return db.escolas.Count(e => e.ID_Escola == id) > 0;
        }
    }
}