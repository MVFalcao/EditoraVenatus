using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using EditoraAPI.Models;

namespace EditoraAPI.Controllers
{
    public class RegistroControleMercadoriasController : Controller
    {
        private EditoraAPIContext db = new EditoraAPIContext();

        // GET: RegistroControleMercadorias
        public ActionResult Index()
        {
            return View(db.RegistroControleMercadorias.ToList());
        }

        // GET: RegistroControleMercadorias/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            RegistroControleMercadoria registroControleMercadoria = db.RegistroControleMercadorias.Find(id);
            if (registroControleMercadoria == null)
            {
                return HttpNotFound();
            }
            return View(registroControleMercadoria);
        }

        // GET: RegistroControleMercadorias/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: RegistroControleMercadorias/Create
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID_RegConMerc,Livro,Quantidade,Tipo,DataReg")] RegistroControleMercadoria registroControleMercadoria)
        {
            if (ModelState.IsValid)
            {
                db.RegistroControleMercadorias.Add(registroControleMercadoria);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(registroControleMercadoria);
        }

        // GET: RegistroControleMercadorias/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            RegistroControleMercadoria registroControleMercadoria = db.RegistroControleMercadorias.Find(id);
            if (registroControleMercadoria == null)
            {
                return HttpNotFound();
            }
            return View(registroControleMercadoria);
        }

        // POST: RegistroControleMercadorias/Edit/5
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID_RegConMerc,Livro,Quantidade,Tipo,DataReg")] RegistroControleMercadoria registroControleMercadoria)
        {
            if (ModelState.IsValid)
            {
                db.Entry(registroControleMercadoria).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(registroControleMercadoria);
        }

        // GET: RegistroControleMercadorias/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            RegistroControleMercadoria registroControleMercadoria = db.RegistroControleMercadorias.Find(id);
            if (registroControleMercadoria == null)
            {
                return HttpNotFound();
            }
            return View(registroControleMercadoria);
        }

        // POST: RegistroControleMercadorias/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            RegistroControleMercadoria registroControleMercadoria = db.RegistroControleMercadorias.Find(id);
            db.RegistroControleMercadorias.Remove(registroControleMercadoria);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
