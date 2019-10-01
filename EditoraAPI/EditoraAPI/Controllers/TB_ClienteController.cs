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
    public class TB_ClienteController : Controller
    {
        private EditoraEntities db = new EditoraEntities();

        // GET: TB_Cliente
        public ActionResult Index()
        {
            return View(db.TB_Cliente.ToList());
        }

        // GET: TB_Cliente/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Cliente tB_Cliente = db.TB_Cliente.Find(id);
            if (tB_Cliente == null)
            {
                return HttpNotFound();
            }
            return View(tB_Cliente);
        }

        // GET: TB_Cliente/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: TB_Cliente/Create
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID_Cliente")] TB_Cliente tB_Cliente)
        {
            if (ModelState.IsValid)
            {
                db.TB_Cliente.Add(tB_Cliente);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(tB_Cliente);
        }

        // GET: TB_Cliente/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Cliente tB_Cliente = db.TB_Cliente.Find(id);
            if (tB_Cliente == null)
            {
                return HttpNotFound();
            }
            return View(tB_Cliente);
        }

        // POST: TB_Cliente/Edit/5
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID_Cliente")] TB_Cliente tB_Cliente)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tB_Cliente).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(tB_Cliente);
        }

        // GET: TB_Cliente/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Cliente tB_Cliente = db.TB_Cliente.Find(id);
            if (tB_Cliente == null)
            {
                return HttpNotFound();
            }
            return View(tB_Cliente);
        }

        // POST: TB_Cliente/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            TB_Cliente tB_Cliente = db.TB_Cliente.Find(id);
            db.TB_Cliente.Remove(tB_Cliente);
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
