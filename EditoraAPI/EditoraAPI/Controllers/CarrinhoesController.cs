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
    public class CarrinhoesController : ApiController
    {
        private BancoEditora db = new BancoEditora();

        // GET: api/Carrinhoes
        public IQueryable<Carrinho> GetCarrinhos()
        {
            return db.Carrinhos;
        }

        // GET: api/Carrinhoes/5
        [ResponseType(typeof(Carrinho))]
        public IHttpActionResult GetCarrinho(int id)
        {
            Carrinho carrinho = db.Carrinhos.Find(id);
            if (carrinho == null)
            {
                return NotFound();
            }

            return Ok(carrinho);
        }

        // PUT: api/Carrinhoes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutCarrinho(int id, Carrinho carrinho)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != carrinho.ID_Carrinho)
            {
                return BadRequest();
            }

            db.Entry(carrinho).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CarrinhoExists(id))
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

        // POST: api/Carrinhoes
        [ResponseType(typeof(Carrinho))]
        public IHttpActionResult PostCarrinho(Carrinho carrinho)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Carrinhos.Add(carrinho);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = carrinho.ID_Carrinho }, carrinho);
        }

        // DELETE: api/Carrinhoes/5
        [ResponseType(typeof(Carrinho))]
        public IHttpActionResult DeleteCarrinho(int id)
        {
            Carrinho carrinho = db.Carrinhos.Find(id);
            if (carrinho == null)
            {
                return NotFound();
            }

            db.Carrinhos.Remove(carrinho);
            db.SaveChanges();

            return Ok(carrinho);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CarrinhoExists(int id)
        {
            return db.Carrinhos.Count(e => e.ID_Carrinho == id) > 0;
        }
    }
}