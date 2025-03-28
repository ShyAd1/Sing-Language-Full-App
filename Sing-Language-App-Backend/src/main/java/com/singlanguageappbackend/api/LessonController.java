package com.singlanguageappbackend.api;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class LessonController {

    @GetMapping("/lessons")
    public List<Lesson> getLessons() {
        return Arrays.asList(
                new Lesson("Números", "Cuenta del 1 al 10 con gestos", "basic"),
                new Lesson("Alfabeto", "Aprende las letras en lenguaje de señas", "basic"),
                new Lesson("Palabras Cotidianas", "Expresiones de uso diario", "intermediate"),
                new Lesson("Ideas Complejas", "Expresa ideas complejas con fluidez", "advanced")
        );
    }

    static class Lesson {
        private String name;
        private String description;
        private String level;

        public Lesson(String name, String description, String level) {
            this.name = name;
            this.description = description;
            this.level = level;
        }

        public String getName() { return name; }
        public String getDescription() { return description; }
        public String getLevel() { return level; }
    }
}