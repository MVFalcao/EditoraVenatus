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
    public class RedeSocialsController : ApiController
    {
        private BancoEditora db = new BancoEditora();

        // GET: api/RedeSocials
        public IQueryable<RedeSocial> GetRedeSocials()
        {
            return db.RedeSocials;
        }

        // GET: api/RedeSocials/5
        [ResponseType(typeof(RedeSocial))]
        public IHttpActionResult GetRedeSocial(int id)
        {
            RedeSocial redeSocial = db.RedeSocials.Find(id);
            if (redeSocial == null)
            {
                return NotFound();
            }

            return Ok(redeSocial);
        }

        // PUT: api/RedeSocials/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutRedeSocial(int id, RedeSocial redeSocial)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != redeSocial.ID_RedeSocial)
            {
                return BadRequest();
            }

            db.Entry(redeSocial).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!RedeSocialExists(id))
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

        // POST: api/RedeSocials
        [ResponseType(typeof(RedeSocial))]
        public IHttpActionResult PostRedeSocial(RedeSocial redeSocial)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.RedeSocials.Add(redeSocial);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = redeSocial.ID_RedeSocial }, redeSocial);
        }

        // DELETE: api/RedeSocials/5
        [ResponseType(typeof(RedeSocial))]
        public IHttpActionResult DeleteRedeSocial(int id)
        {
            RedeSocial redeSocial = db.RedeSocials.Find(id);
            if (redeSocial == null)
            {
                return NotFound();
            }

            db.RedeSocials.Remove(redeSocial);
            db.SaveChanges();

            return Ok(redeSocial);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool RedeSocialExists(int id)
        {
            return db.RedeSocials.Count(e => e.ID_RedeSocial == id) > 0;
        }
    }
}