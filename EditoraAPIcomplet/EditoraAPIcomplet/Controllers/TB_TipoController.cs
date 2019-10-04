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
    public class TB_TipoController : ApiController
    {
        private EditoraEntities db = new EditoraEntities();

        // GET: api/TB_Tipo
        public IQueryable<TB_Tipo> GetTB_Tipo()
        {
            return db.TB_Tipo;
        }

        // GET: api/TB_Tipo/5
        [ResponseType(typeof(TB_Tipo))]
        public IHttpActionResult GetTB_Tipo(int id)
        {
            TB_Tipo tB_Tipo = db.TB_Tipo.Find(id);
            if (tB_Tipo == null)
            {
                return NotFound();
            }

            return Ok(tB_Tipo);
        }

        // PUT: api/TB_Tipo/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTB_Tipo(int id, TB_Tipo tB_Tipo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tB_Tipo.ID_Tipo)
            {
                return BadRequest();
            }

            db.Entry(tB_Tipo).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TB_TipoExists(id))
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

        // POST: api/TB_Tipo
        [ResponseType(typeof(TB_Tipo))]
        public IHttpActionResult PostTB_Tipo(TB_Tipo tB_Tipo)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TB_Tipo.Add(tB_Tipo);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (TB_TipoExists(tB_Tipo.ID_Tipo))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = tB_Tipo.ID_Tipo }, tB_Tipo);
        }

        // DELETE: api/TB_Tipo/5
        [ResponseType(typeof(TB_Tipo))]
        public IHttpActionResult DeleteTB_Tipo(int id)
        {
            TB_Tipo tB_Tipo = db.TB_Tipo.Find(id);
            if (tB_Tipo == null)
            {
                return NotFound();
            }

            db.TB_Tipo.Remove(tB_Tipo);
            db.SaveChanges();

            return Ok(tB_Tipo);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TB_TipoExists(int id)
        {
            return db.TB_Tipo.Count(e => e.ID_Tipo == id) > 0;
        }
    }
}