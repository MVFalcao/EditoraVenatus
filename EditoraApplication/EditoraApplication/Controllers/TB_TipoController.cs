using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using EditoraApplication.Models;

namespace EditoraApplication.Controllers
{
    public class TB_TipoController : Controller
    {
        private EditoraEntities1 db = new EditoraEntities1();

        // GET: TB_Tipo
        public ActionResult Index()
        {
            return View(db.TB_Tipo.ToList());
        }

        // GET: TB_Tipo/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Tipo tB_Tipo = db.TB_Tipo.Find(id);
            if (tB_Tipo == null)
            {
                return HttpNotFound();
            }
            return View(tB_Tipo);
        }

        // GET: TB_Tipo/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: TB_Tipo/Create
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID_Tipo,Descricao")] TB_Tipo tB_Tipo)
        {
            if (ModelState.IsValid)
            {
                db.TB_Tipo.Add(tB_Tipo);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(tB_Tipo);
        }

        // GET: TB_Tipo/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Tipo tB_Tipo = db.TB_Tipo.Find(id);
            if (tB_Tipo == null)
            {
                return HttpNotFound();
            }
            return View(tB_Tipo);
        }

        // POST: TB_Tipo/Edit/5
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID_Tipo,Descricao")] TB_Tipo tB_Tipo)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tB_Tipo).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(tB_Tipo);
        }

        // GET: TB_Tipo/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Tipo tB_Tipo = db.TB_Tipo.Find(id);
            if (tB_Tipo == null)
            {
                return HttpNotFound();
            }
            return View(tB_Tipo);
        }

        // POST: TB_Tipo/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            TB_Tipo tB_Tipo = db.TB_Tipo.Find(id);
            db.TB_Tipo.Remove(tB_Tipo);
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
