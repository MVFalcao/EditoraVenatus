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
    public class TelefonesController : ApiController
    {
        private EditoraAPIContext db = new EditoraAPIContext();
        private EncodingTokenLogin en = new EncodingTokenLogin();
        // GET: api/Telefones
        public IQueryable<Telefone> Gettelefones()
        {
            return db.telefones;
        }

        // GET: api/Telefones/5
        [ResponseType(typeof(Telefone))]
        [Route("api/Telefones/GetTelefoneByCliente")]
        public IHttpActionResult GetTelefoneByCliente(int id)
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
            try
            {
                var tel = from t in db.telefones where t.Id_c == id select t.ID_Telefone;
                Telefone telefone = db.telefones.Find(tel.First());
                if (telefone == null)
                {
                    return NotFound();
                }

                return Ok(telefone);
            }catch(Exception e)
            {
                return NotFound();
            }
        }

        [ResponseType(typeof(Telefone))]
        [Route("api/Telefones/GetTelefoneByAutor")]
        public IHttpActionResult GetTelefoneByAutor(int id)
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
            try
            {
                var tel = from t in db.telefones where t.Id_a == id select t.ID_Telefone;
                Telefone telefone = db.telefones.Find(tel.First());
                if (telefone == null)
                {
                    return NotFound();
                }

                return Ok(telefone);
            }catch(Exception e)
            {
                return NotFound();
            }
        }
        // PUT: api/Telefones/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTelefone(int id, Telefone telefone)
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

            if (id != telefone.ID_Telefone)
            {
                return BadRequest();
            }

            db.Entry(telefone).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TelefoneExists(id))
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

        // POST: api/Telefones
        [ResponseType(typeof(Telefone))]
        public IHttpActionResult PostTelefone(Telefone telefone)
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

            db.telefones.Add(telefone);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = telefone.ID_Telefone }, telefone);
        }

        // DELETE: api/Telefones/5
        [ResponseType(typeof(Telefone))]
        public IHttpActionResult DeleteTelefone(int id)
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
            Telefone telefone = db.telefones.Find(id);
            if (telefone == null)
            {
                return NotFound();
            }

            db.telefones.Remove(telefone);
            db.SaveChanges();

            return Ok(telefone);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TelefoneExists(int id)
        {
            return db.telefones.Count(e => e.ID_Telefone == id) > 0;
        }
    }
}