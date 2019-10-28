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
    public class LoginsController : ApiController
    {
        private EditoraAPIContext db = new EditoraAPIContext();

        // GET: api/Logins
        public IQueryable<Login> Getlogins()
        {
            return db.logins;
        }

        // GET: api/Logins/5
        [ResponseType(typeof(Login))]
        public IHttpActionResult GetLogin(int id)
        {
            Login login = db.logins.Find(id);
            if (login == null)
            {
                return NotFound();
            }

            return Ok(login);
        }

        // PUT: api/Logins/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutLogin(int id, Login login)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != login.ID_Login)
            {
                return BadRequest();
            }

            db.Entry(login).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LoginExists(id))
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

        // POST: api/Logins
        [ResponseType(typeof(Login))]
        public IHttpActionResult PostLogin(Login login)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.logins.Add(login);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = login.ID_Login }, login);
        }

        // DELETE: api/Logins/5
        [ResponseType(typeof(Login))]
        public IHttpActionResult DeleteLogin(int id)
        {
            Login login = db.logins.Find(id);
            if (login == null)
            {
                return NotFound();
            }

            db.logins.Remove(login);
            db.SaveChanges();

            return Ok(login);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool LoginExists(int id)
        {
            return db.logins.Count(e => e.ID_Login == id) > 0;
        }
    }
}