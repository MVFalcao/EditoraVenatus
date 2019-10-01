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
    public class TB_CupomController : Controller
    {
        private EditoraEntities db = new EditoraEntities();

        // GET: TB_Cupom
        public ActionResult Index()
        {
            return View(db.TB_Cupom.ToList());
        }

        // GET: TB_Cupom/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Cupom tB_Cupom = db.TB_Cupom.Find(id);
            if (tB_Cupom == null)
            {
                return HttpNotFound();
            }
            return View(tB_Cupom);
        }

        // GET: TB_Cupom/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: TB_Cupom/Create
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID_Cupom,Valor_Desconto,Nome,Data_ini,Data_fim")] TB_Cupom tB_Cupom)
        {
            if (ModelState.IsValid)
            {
                db.TB_Cupom.Add(tB_Cupom);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(tB_Cupom);
        }

        // GET: TB_Cupom/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Cupom tB_Cupom = db.TB_Cupom.Find(id);
            if (tB_Cupom == null)
            {
                return HttpNotFound();
            }
            return View(tB_Cupom);
        }

        // POST: TB_Cupom/Edit/5
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID_Cupom,Valor_Desconto,Nome,Data_ini,Data_fim")] TB_Cupom tB_Cupom)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tB_Cupom).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(tB_Cupom);
        }

        // GET: TB_Cupom/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Cupom tB_Cupom = db.TB_Cupom.Find(id);
            if (tB_Cupom == null)
            {
                return HttpNotFound();
            }
            return View(tB_Cupom);
        }

        // POST: TB_Cupom/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            TB_Cupom tB_Cupom = db.TB_Cupom.Find(id);
            db.TB_Cupom.Remove(tB_Cupom);
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
