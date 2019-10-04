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
    public class TB_CarrinhoController : ApiController
    {
        private EditoraEntities db = new EditoraEntities();

        // GET: api/TB_Carrinho
        public IQueryable<TB_Carrinho> GetTB_Carrinho()
        {
            return db.TB_Carrinho;
        }

        // GET: api/TB_Carrinho/5
        [ResponseType(typeof(TB_Carrinho))]
        public IHttpActionResult GetTB_Carrinho(int id)
        {
            TB_Carrinho tB_Carrinho = db.TB_Carrinho.Find(id);
            if (tB_Carrinho == null)
            {
                return NotFound();
            }

            return Ok(tB_Carrinho);
        }

        // PUT: api/TB_Carrinho/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTB_Carrinho(int id, TB_Carrinho tB_Carrinho)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tB_Carrinho.ID_Carrinho)
            {
                return BadRequest();
            }

            db.Entry(tB_Carrinho).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TB_CarrinhoExists(id))
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

        // POST: api/TB_Carrinho
        [ResponseType(typeof(TB_Carrinho))]
        public IHttpActionResult PostTB_Carrinho(TB_Carrinho tB_Carrinho)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TB_Carrinho.Add(tB_Carrinho);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (TB_CarrinhoExists(tB_Carrinho.ID_Carrinho))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = tB_Carrinho.ID_Carrinho }, tB_Carrinho);
        }

        // DELETE: api/TB_Carrinho/5
        [ResponseType(typeof(TB_Carrinho))]
        public IHttpActionResult DeleteTB_Carrinho(int id)
        {
            TB_Carrinho tB_Carrinho = db.TB_Carrinho.Find(id);
            if (tB_Carrinho == null)
            {
                return NotFound();
            }

            db.TB_Carrinho.Remove(tB_Carrinho);
            db.SaveChanges();

            return Ok(tB_Carrinho);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TB_CarrinhoExists(int id)
        {
            return db.TB_Carrinho.Count(e => e.ID_Carrinho == id) > 0;
        }
    }
}