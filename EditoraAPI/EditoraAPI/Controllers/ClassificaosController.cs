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
    public class ClassificaosController : ApiController
    {
        private EditoraAPIContext db = new EditoraAPIContext();

        // GET: api/Classificaos
        public IQueryable<Classificao> Getclassificaos()
        {
            return db.classificaos;
        }

        // GET: api/Classificaos/5
        [ResponseType(typeof(Classificao))]
        public IHttpActionResult GetClassificao(int id)
        {
            Classificao classificao = db.classificaos.Find(id);
            if (classificao == null)
            {
                return NotFound();
            }

            return Ok(classificao);
        }

        // PUT: api/Classificaos/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutClassificao(int id, Classificao classificao)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != classificao.ID_Classificacao)
            {
                return BadRequest();
            }

            db.Entry(classificao).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClassificaoExists(id))
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

        // POST: api/Classificaos
        [ResponseType(typeof(Classificao))]
        public IHttpActionResult PostClassificao(Classificao classificao)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.classificaos.Add(classificao);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = classificao.ID_Classificacao }, classificao);
        }

        // DELETE: api/Classificaos/5
        [ResponseType(typeof(Classificao))]
        public IHttpActionResult DeleteClassificao(int id)
        {
            Classificao classificao = db.classificaos.Find(id);
            if (classificao == null)
            {
                return NotFound();
            }

            db.classificaos.Remove(classificao);
            db.SaveChanges();

            return Ok(classificao);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ClassificaoExists(int id)
        {
            return db.classificaos.Count(e => e.ID_Classificacao == id) > 0;
        }
    }
}