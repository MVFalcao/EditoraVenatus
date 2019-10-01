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
    public class TB_RedeSocialController : Controller
    {
        private EditoraEntities db = new EditoraEntities();

        // GET: TB_RedeSocial
        public ActionResult Index()
        {
            var tB_RedeSocial = db.TB_RedeSocial.Include(t => t.TB_Autor).Include(t => t.TB_Cliente);
            return View(tB_RedeSocial.ToList());
        }

        // GET: TB_RedeSocial/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_RedeSocial tB_RedeSocial = db.TB_RedeSocial.Find(id);
            if (tB_RedeSocial == null)
            {
                return HttpNotFound();
            }
            return View(tB_RedeSocial);
        }

        // GET: TB_RedeSocial/Create
        public ActionResult Create()
        {
            ViewBag.ID_AutorCliente = new SelectList(db.TB_Autor, "ID_Autor", "CPF");
            ViewBag.ID_AutorCliente = new SelectList(db.TB_Cliente, "ID_Cliente", "ID_Cliente");
            return View();
        }

        // POST: TB_RedeSocial/Create
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID_RedeSocial,ID_AutorCliente,Email,Instagram,Twitter,Facebook")] TB_RedeSocial tB_RedeSocial)
        {
            if (ModelState.IsValid)
            {
                db.TB_RedeSocial.Add(tB_RedeSocial);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.ID_AutorCliente = new SelectList(db.TB_Autor, "ID_Autor", "CPF", tB_RedeSocial.ID_AutorCliente);
            ViewBag.ID_AutorCliente = new SelectList(db.TB_Cliente, "ID_Cliente", "ID_Cliente", tB_RedeSocial.ID_AutorCliente);
            return View(tB_RedeSocial);
        }

        // GET: TB_RedeSocial/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_RedeSocial tB_RedeSocial = db.TB_RedeSocial.Find(id);
            if (tB_RedeSocial == null)
            {
                return HttpNotFound();
            }
            ViewBag.ID_AutorCliente = new SelectList(db.TB_Autor, "ID_Autor", "CPF", tB_RedeSocial.ID_AutorCliente);
            ViewBag.ID_AutorCliente = new SelectList(db.TB_Cliente, "ID_Cliente", "ID_Cliente", tB_RedeSocial.ID_AutorCliente);
            return View(tB_RedeSocial);
        }

        // POST: TB_RedeSocial/Edit/5
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID_RedeSocial,ID_AutorCliente,Email,Instagram,Twitter,Facebook")] TB_RedeSocial tB_RedeSocial)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tB_RedeSocial).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ID_AutorCliente = new SelectList(db.TB_Autor, "ID_Autor", "CPF", tB_RedeSocial.ID_AutorCliente);
            ViewBag.ID_AutorCliente = new SelectList(db.TB_Cliente, "ID_Cliente", "ID_Cliente", tB_RedeSocial.ID_AutorCliente);
            return View(tB_RedeSocial);
        }

        // GET: TB_RedeSocial/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_RedeSocial tB_RedeSocial = db.TB_RedeSocial.Find(id);
            if (tB_RedeSocial == null)
            {
                return HttpNotFound();
            }
            return View(tB_RedeSocial);
        }

        // POST: TB_RedeSocial/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            TB_RedeSocial tB_RedeSocial = db.TB_RedeSocial.Find(id);
            db.TB_RedeSocial.Remove(tB_RedeSocial);
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
