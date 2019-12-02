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
    public class EstoquesController : ApiController
    {
        private EditoraAPIContext db = new EditoraAPIContext();
        private EncodingTokenLogin en = new EncodingTokenLogin();
        // GET: api/Estoques
        public IQueryable<Estoque> Getestoques()
        {
            return db.estoques;
        }

        // GET: api/Estoques/5
        [ResponseType(typeof(Estoque))]
        public IHttpActionResult GetEstoque(int id)
        {
            var headers = Request.Headers;
            if (headers.Contains("jwt"))
            {
                try
                {
                    en.ValidToken(headers.GetValues("jwt").First());
                    var estoque = from e in db.estoques where id == e.Livro select new { e.Livro, e.Quantidade, e.ID_Estoque };
                    if (estoque == null)
                    {
                        return NotFound();
                    }
                    return Ok(estoque);
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
            
        }

        // PUT: api/Estoques/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutEstoque(int id, Estoque estoque)
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

            if (id != estoque.ID_Estoque)
            {
                return BadRequest();
            }

            db.Entry(estoque).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EstoqueExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            if (estoque.Quantidade <= 100)
            {
                try
                {
                    var livro = from l in db.livros join e in db.estoques on l.ID_Livro equals e.Livro select l.ID_Livro;
                    if (livro == null) return NotFound();
                    return Ok(livro);
                }
                catch (Exception e)
                {
                    return BadRequest();
                }
            }
            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Estoques
        [ResponseType(typeof(Estoque))]
        public IHttpActionResult PostEstoque(Estoque estoque)
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

            db.estoques.Add(estoque);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = estoque.ID_Estoque }, estoque);
        }

        // DELETE: api/Estoques/5
        [ResponseType(typeof(Estoque))]
        public IHttpActionResult DeleteEstoque(int id)
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
            Estoque estoque = db.estoques.Find(id);
            if (estoque == null)
            {
                return NotFound();
            }

            db.estoques.Remove(estoque);
            db.SaveChanges();

            return Ok(estoque);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool EstoqueExists(int id)
        {
            return db.estoques.Count(e => e.ID_Estoque == id) > 0;
        }
    }
}