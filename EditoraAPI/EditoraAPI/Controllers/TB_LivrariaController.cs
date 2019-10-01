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
    public class TB_LivrariaController : Controller
    {
        private EditoraEntities db = new EditoraEntities();

        // GET: TB_Livraria
        public ActionResult Index()
        {
            var tB_Livraria = db.TB_Livraria.Include(t => t.TB_Cliente);
            return View(tB_Livraria.ToList());
        }

        // GET: TB_Livraria/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Livraria tB_Livraria = db.TB_Livraria.Find(id);
            if (tB_Livraria == null)
            {
                return HttpNotFound();
            }
            return View(tB_Livraria);
        }

        // GET: TB_Livraria/Create
        public ActionResult Create()
        {
            ViewBag.ID_Cliente = new SelectList(db.TB_Cliente, "ID_Cliente", "ID_Cliente");
            return View();
        }

        // POST: TB_Livraria/Create
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID_Livraria,ID_Cliente,CNPJ,Tipo_consignacao,Nome")] TB_Livraria tB_Livraria)
        {
            if (ModelState.IsValid)
            {
                db.TB_Livraria.Add(tB_Livraria);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.ID_Cliente = new SelectList(db.TB_Cliente, "ID_Cliente", "ID_Cliente", tB_Livraria.ID_Cliente);
            return View(tB_Livraria);
        }

        // GET: TB_Livraria/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Livraria tB_Livraria = db.TB_Livraria.Find(id);
            if (tB_Livraria == null)
            {
                return HttpNotFound();
            }
            ViewBag.ID_Cliente = new SelectList(db.TB_Cliente, "ID_Cliente", "ID_Cliente", tB_Livraria.ID_Cliente);
            return View(tB_Livraria);
        }

        // POST: TB_Livraria/Edit/5
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID_Livraria,ID_Cliente,CNPJ,Tipo_consignacao,Nome")] TB_Livraria tB_Livraria)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tB_Livraria).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ID_Cliente = new SelectList(db.TB_Cliente, "ID_Cliente", "ID_Cliente", tB_Livraria.ID_Cliente);
            return View(tB_Livraria);
        }

        // GET: TB_Livraria/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Livraria tB_Livraria = db.TB_Livraria.Find(id);
            if (tB_Livraria == null)
            {
                return HttpNotFound();
            }
            return View(tB_Livraria);
        }

        // POST: TB_Livraria/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            TB_Livraria tB_Livraria = db.TB_Livraria.Find(id);
            db.TB_Livraria.Remove(tB_Livraria);
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
