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
    public class TB_TelefoneController : Controller
    {
        private EditoraEntities db = new EditoraEntities();

        // GET: TB_Telefone
        public ActionResult Index()
        {
            var tB_Telefone = db.TB_Telefone.Include(t => t.TB_Autor).Include(t => t.TB_Cliente);
            return View(tB_Telefone.ToList());
        }

        // GET: TB_Telefone/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Telefone tB_Telefone = db.TB_Telefone.Find(id);
            if (tB_Telefone == null)
            {
                return HttpNotFound();
            }
            return View(tB_Telefone);
        }

        // GET: TB_Telefone/Create
        public ActionResult Create()
        {
            ViewBag.ID_AutorCliente = new SelectList(db.TB_Autor, "ID_Autor", "CPF");
            ViewBag.ID_AutorCliente = new SelectList(db.TB_Cliente, "ID_Cliente", "ID_Cliente");
            return View();
        }

        // POST: TB_Telefone/Create
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID_Telefone,Tipo_Telefone,Numero,ID_AutorCliente")] TB_Telefone tB_Telefone)
        {
            if (ModelState.IsValid)
            {
                db.TB_Telefone.Add(tB_Telefone);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.ID_AutorCliente = new SelectList(db.TB_Autor, "ID_Autor", "CPF", tB_Telefone.ID_AutorCliente);
            ViewBag.ID_AutorCliente = new SelectList(db.TB_Cliente, "ID_Cliente", "ID_Cliente", tB_Telefone.ID_AutorCliente);
            return View(tB_Telefone);
        }

        // GET: TB_Telefone/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Telefone tB_Telefone = db.TB_Telefone.Find(id);
            if (tB_Telefone == null)
            {
                return HttpNotFound();
            }
            ViewBag.ID_AutorCliente = new SelectList(db.TB_Autor, "ID_Autor", "CPF", tB_Telefone.ID_AutorCliente);
            ViewBag.ID_AutorCliente = new SelectList(db.TB_Cliente, "ID_Cliente", "ID_Cliente", tB_Telefone.ID_AutorCliente);
            return View(tB_Telefone);
        }

        // POST: TB_Telefone/Edit/5
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID_Telefone,Tipo_Telefone,Numero,ID_AutorCliente")] TB_Telefone tB_Telefone)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tB_Telefone).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ID_AutorCliente = new SelectList(db.TB_Autor, "ID_Autor", "CPF", tB_Telefone.ID_AutorCliente);
            ViewBag.ID_AutorCliente = new SelectList(db.TB_Cliente, "ID_Cliente", "ID_Cliente", tB_Telefone.ID_AutorCliente);
            return View(tB_Telefone);
        }

        // GET: TB_Telefone/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Telefone tB_Telefone = db.TB_Telefone.Find(id);
            if (tB_Telefone == null)
            {
                return HttpNotFound();
            }
            return View(tB_Telefone);
        }

        // POST: TB_Telefone/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            TB_Telefone tB_Telefone = db.TB_Telefone.Find(id);
            db.TB_Telefone.Remove(tB_Telefone);
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
