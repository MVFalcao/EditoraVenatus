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
    public class TB_CompraController : Controller
    {
        private EditoraEntities db = new EditoraEntities();

        // GET: TB_Compra
        public ActionResult Index()
        {
            var tB_Compra = db.TB_Compra.Include(t => t.TB_Cliente).Include(t => t.TB_Tipo);
            return View(tB_Compra.ToList());
        }

        // GET: TB_Compra/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Compra tB_Compra = db.TB_Compra.Find(id);
            if (tB_Compra == null)
            {
                return HttpNotFound();
            }
            return View(tB_Compra);
        }

        // GET: TB_Compra/Create
        public ActionResult Create()
        {
            ViewBag.ID_Cliente = new SelectList(db.TB_Cliente, "ID_Cliente", "ID_Cliente");
            ViewBag.ID_Tipo = new SelectList(db.TB_Tipo, "ID_Tipo", "Descricao");
            return View();
        }

        // POST: TB_Compra/Create
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID_Compra,ID_Cliente,ID_Tipo,Preco_total,Data_Pag")] TB_Compra tB_Compra)
        {
            if (ModelState.IsValid)
            {
                db.TB_Compra.Add(tB_Compra);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.ID_Cliente = new SelectList(db.TB_Cliente, "ID_Cliente", "ID_Cliente", tB_Compra.ID_Cliente);
            ViewBag.ID_Tipo = new SelectList(db.TB_Tipo, "ID_Tipo", "Descricao", tB_Compra.ID_Tipo);
            return View(tB_Compra);
        }

        // GET: TB_Compra/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Compra tB_Compra = db.TB_Compra.Find(id);
            if (tB_Compra == null)
            {
                return HttpNotFound();
            }
            ViewBag.ID_Cliente = new SelectList(db.TB_Cliente, "ID_Cliente", "ID_Cliente", tB_Compra.ID_Cliente);
            ViewBag.ID_Tipo = new SelectList(db.TB_Tipo, "ID_Tipo", "Descricao", tB_Compra.ID_Tipo);
            return View(tB_Compra);
        }

        // POST: TB_Compra/Edit/5
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID_Compra,ID_Cliente,ID_Tipo,Preco_total,Data_Pag")] TB_Compra tB_Compra)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tB_Compra).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ID_Cliente = new SelectList(db.TB_Cliente, "ID_Cliente", "ID_Cliente", tB_Compra.ID_Cliente);
            ViewBag.ID_Tipo = new SelectList(db.TB_Tipo, "ID_Tipo", "Descricao", tB_Compra.ID_Tipo);
            return View(tB_Compra);
        }

        // GET: TB_Compra/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Compra tB_Compra = db.TB_Compra.Find(id);
            if (tB_Compra == null)
            {
                return HttpNotFound();
            }
            return View(tB_Compra);
        }

        // POST: TB_Compra/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            TB_Compra tB_Compra = db.TB_Compra.Find(id);
            db.TB_Compra.Remove(tB_Compra);
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
