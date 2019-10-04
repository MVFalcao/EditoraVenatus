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
    public class TB_LivrariaController : ApiController
    {
        private EditoraEntities db = new EditoraEntities();

        // GET: api/TB_Livraria
        public IQueryable<TB_Livraria> GetTB_Livraria()
        {
            return db.TB_Livraria;
        }

        // GET: api/TB_Livraria/5
        [ResponseType(typeof(TB_Livraria))]
        public IHttpActionResult GetTB_Livraria(int id)
        {
            TB_Livraria tB_Livraria = db.TB_Livraria.Find(id);
            if (tB_Livraria == null)
            {
                return NotFound();
            }

            return Ok(tB_Livraria);
        }

        // PUT: api/TB_Livraria/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTB_Livraria(int id, TB_Livraria tB_Livraria)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tB_Livraria.ID_Livraria)
            {
                return BadRequest();
            }

            db.Entry(tB_Livraria).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TB_LivrariaExists(id))
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

        // POST: api/TB_Livraria
        [ResponseType(typeof(TB_Livraria))]
        public IHttpActionResult PostTB_Livraria(TB_Livraria tB_Livraria)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TB_Livraria.Add(tB_Livraria);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (TB_LivrariaExists(tB_Livraria.ID_Livraria))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = tB_Livraria.ID_Livraria }, tB_Livraria);
        }

        // DELETE: api/TB_Livraria/5
        [ResponseType(typeof(TB_Livraria))]
        public IHttpActionResult DeleteTB_Livraria(int id)
        {
            TB_Livraria tB_Livraria = db.TB_Livraria.Find(id);
            if (tB_Livraria == null)
            {
                return NotFound();
            }

            db.TB_Livraria.Remove(tB_Livraria);
            db.SaveChanges();

            return Ok(tB_Livraria);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TB_LivrariaExists(int id)
        {
            return db.TB_Livraria.Count(e => e.ID_Livraria == id) > 0;
        }
    }
}