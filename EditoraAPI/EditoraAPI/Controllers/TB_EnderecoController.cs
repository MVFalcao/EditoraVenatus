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
    public class TB_EnderecoController : Controller
    {
        private EditoraEntities db = new EditoraEntities();

        // GET: TB_Endereco
        public ActionResult Index()
        {
            var tB_Endereco = db.TB_Endereco.Include(t => t.TB_Autor).Include(t => t.TB_Cliente);
            return View(tB_Endereco.ToList());
        }

        // GET: TB_Endereco/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Endereco tB_Endereco = db.TB_Endereco.Find(id);
            if (tB_Endereco == null)
            {
                return HttpNotFound();
            }
            return View(tB_Endereco);
        }

        // GET: TB_Endereco/Create
        public ActionResult Create()
        {
            ViewBag.ID_AutorCliente = new SelectList(db.TB_Autor, "ID_Autor", "CPF");
            ViewBag.ID_AutorCliente = new SelectList(db.TB_Cliente, "ID_Cliente", "ID_Cliente");
            return View();
        }

        // POST: TB_Endereco/Create
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "ID_Endereco,ID_AutorCliente,CEP,Cidade,Bairro,Complemento")] TB_Endereco tB_Endereco)
        {
            if (ModelState.IsValid)
            {
                db.TB_Endereco.Add(tB_Endereco);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.ID_AutorCliente = new SelectList(db.TB_Autor, "ID_Autor", "CPF", tB_Endereco.ID_AutorCliente);
            ViewBag.ID_AutorCliente = new SelectList(db.TB_Cliente, "ID_Cliente", "ID_Cliente", tB_Endereco.ID_AutorCliente);
            return View(tB_Endereco);
        }

        // GET: TB_Endereco/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Endereco tB_Endereco = db.TB_Endereco.Find(id);
            if (tB_Endereco == null)
            {
                return HttpNotFound();
            }
            ViewBag.ID_AutorCliente = new SelectList(db.TB_Autor, "ID_Autor", "CPF", tB_Endereco.ID_AutorCliente);
            ViewBag.ID_AutorCliente = new SelectList(db.TB_Cliente, "ID_Cliente", "ID_Cliente", tB_Endereco.ID_AutorCliente);
            return View(tB_Endereco);
        }

        // POST: TB_Endereco/Edit/5
        // Para se proteger de mais ataques, ative as propriedades específicas a que você quer se conectar. Para 
        // obter mais detalhes, consulte https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "ID_Endereco,ID_AutorCliente,CEP,Cidade,Bairro,Complemento")] TB_Endereco tB_Endereco)
        {
            if (ModelState.IsValid)
            {
                db.Entry(tB_Endereco).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.ID_AutorCliente = new SelectList(db.TB_Autor, "ID_Autor", "CPF", tB_Endereco.ID_AutorCliente);
            ViewBag.ID_AutorCliente = new SelectList(db.TB_Cliente, "ID_Cliente", "ID_Cliente", tB_Endereco.ID_AutorCliente);
            return View(tB_Endereco);
        }

        // GET: TB_Endereco/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            TB_Endereco tB_Endereco = db.TB_Endereco.Find(id);
            if (tB_Endereco == null)
            {
                return HttpNotFound();
            }
            return View(tB_Endereco);
        }

        // POST: TB_Endereco/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            TB_Endereco tB_Endereco = db.TB_Endereco.Find(id);
            db.TB_Endereco.Remove(tB_Endereco);
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
