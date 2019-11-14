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
using Newtonsoft.Json;

namespace EditoraAPI.Controllers
{
    public class LoginsController : ApiController
    {
        private EditoraAPIContext db = new EditoraAPIContext();
        private EncodingTokenLogin en = new EncodingTokenLogin();
        // GET: api/Logins
        public IQueryable<Login> GetLogins()
        {
            return db.Logins;
        }




        // GET: api/Logins/5
        [ResponseType(typeof(Login))]
        public IHttpActionResult GetLogin(int id)
        {
            Login login = db.Logins.Find(id);
            if (login == null)
            {
                return NotFound();
            }

            return Ok(login);
        }
        [ResponseType(typeof(string))]
        [Route("api/GetClienteLog/")]
        public IHttpActionResult GetClientLog(int id)
        {
            var cli = from c in db.Logins where c.ID_Login == id select c.cliente;
            if (cli == null || cli.First() == 0)
            {
                return NotFound();
            }

            return Ok(cli.First());
        }
        // GET: api/GetToken
        [Route("api/GetToken")]
        [HttpGet]
        public IHttpActionResult GetToken()
        {
            TData Cl;
            var headers = Request.Headers;
            if (headers.Contains("jwt"))
            {
                try
                {
                    en.ValidToken(headers.GetValues("jwt").First());
                    Cl = JsonConvert.DeserializeObject<TData>(en.ValidToken(headers.GetValues("jwt").First()));
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
            Login log = db.Logins.FirstOrDefault(l => l.ID_Login == Cl.id);
            if (log == null)
            {
                return NotFound();
            }

            return Ok(log);
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

            db.Logins.Add(login);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = login.ID_Login }, login);
        }

        [ResponseType(typeof(Login))]
        public IHttpActionResult PostLoginPass(string login,string senha)
        {
            var id = from l in db.Logins where l.Senha == senha && l.Usuario == login select l.ID_Login;
            Login log = db.Logins.Find(id.First());
            if(log == null)
            {
                return NotFound();
            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            return Ok(en.EncodeLogin(log.ID_Login));
        }
        // DELETE: api/Logins/5
        [ResponseType(typeof(Login))]
        public IHttpActionResult DeleteLogin(int id)
        {
            Login login = db.Logins.Find(id);
            if (login == null)
            {
                return NotFound();
            }

            db.Logins.Remove(login);
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
            return db.Logins.Count(e => e.ID_Login == id) > 0;
        }
    }
}