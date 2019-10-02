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
    public class TB_EnderecoController : ApiController
    {
        private EditoraEntities db = new EditoraEntities();

        // GET: api/TB_Endereco
        public IQueryable<TB_Endereco> GetTB_Endereco()
        {
            return db.TB_Endereco;
        }

        // GET: api/TB_Endereco/5
        [ResponseType(typeof(TB_Endereco))]
        public IHttpActionResult GetTB_Endereco(int id)
        {
            TB_Endereco tB_Endereco = db.TB_Endereco.Find(id);
            if (tB_Endereco == null)
            {
                return NotFound();
            }

            return Ok(tB_Endereco);
        }

        // PUT: api/TB_Endereco/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTB_Endereco(int id, TB_Endereco tB_Endereco)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tB_Endereco.ID_Endereco)
            {
                return BadRequest();
            }

            db.Entry(tB_Endereco).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TB_EnderecoExists(id))
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

        // POST: api/TB_Endereco
        [ResponseType(typeof(TB_Endereco))]
        public IHttpActionResult PostTB_Endereco(TB_Endereco tB_Endereco)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TB_Endereco.Add(tB_Endereco);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (TB_EnderecoExists(tB_Endereco.ID_Endereco))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = tB_Endereco.ID_Endereco }, tB_Endereco);
        }

        // DELETE: api/TB_Endereco/5
        [ResponseType(typeof(TB_Endereco))]
        public IHttpActionResult DeleteTB_Endereco(int id)
        {
            TB_Endereco tB_Endereco = db.TB_Endereco.Find(id);
            if (tB_Endereco == null)
            {
                return NotFound();
            }

            db.TB_Endereco.Remove(tB_Endereco);
            db.SaveChanges();

            return Ok(tB_Endereco);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TB_EnderecoExists(int id)
        {
            return db.TB_Endereco.Count(e => e.ID_Endereco == id) > 0;
        }
    }
}